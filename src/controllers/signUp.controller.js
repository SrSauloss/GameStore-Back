import connection from "../database.js";
import bcrypt from "bcrypt";
import { signUpSchema } from "../validates/signUp.validate.js";

const signUp = async (req, res) => {
  const { email, name, cpf, phone, password } = req.body;

  if (signUpSchema.validate({ email, name, cpf, phone, password }).error) {
    return res.sendStatus(403);
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const emailCheck = await connection.query(
      `
        SELECT * FROM clients
        WHERE email = $1
        `,
      [email]
    );
    if (emailCheck.rowCount !== 0) {
      return res.status(409).send("Invalid email");
    }

    const cpfCheck = await connection.query(
      `
        SELECT * FROM clients
        WHERE cpf = $1
        `,
      [cpf]
    );
    if (cpfCheck.rowCount !== 0) {
      return res.status(409).send("Invalid cpf");
    }

    await connection.query(
      `
        INSERT INTO clients 
        (email, name, cpf, phone, password) 
        VALUES ($1, $2, $3, $4, $5)
        `,
      [email, name, cpf, phone, passwordHash]
    );

    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

export { signUp };
