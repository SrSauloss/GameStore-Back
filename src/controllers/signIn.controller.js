import connection from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema } from "../validates/signIn.validate.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (signInSchema.validate({ email, password }).error) {
    return res.sendStatus(403);
  }

  try {
    const result = await connection.query(
      `
            SELECT * FROM users
            WHERE email = $1 
        `,
      [email]
    );

    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const data = { userId: user.id };
      const secretKey = process.env.JWT_SECRET;
      const config = { expiresIn: 60 * 60 * 24 };

      const token = jwt.sign(data, secretKey, config);

      res.status(200).send({ token, name: user.name });
    } else {
      res.sendStatus(401);
    }
  } catch {
    res.sendStatus(500);
  }
};

export { signIn };
