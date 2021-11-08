import "./setup.js";
import app from "./app.js";

app.listen(process.env.PORT || 4000, () => {
  console.log(`Running in mode ${process.env.NODE_ENV}`);
});
