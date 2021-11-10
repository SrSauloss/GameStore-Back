import express from "express";
import auth from "./middlewares/auth.js";
import {
  updateStockProduct,
  listAllProducts,
  storeProduct,
} from "./controllers/product.controller.js";
import {
  listAllCategories,
  storeCategorie,
} from "./controllers/categorie.controller.js";
import { signUp } from "./controllers/signUp.controller.js";
import { signIn } from "./controllers/signIn.controller.js";

const routes = express.Router();

routes.post("/sign-up", signUp);
routes.post("/sign-in", signIn);

routes.post("/product/category/new", auth, storeCategorie);
routes.get("/product/categories", auth, listAllCategories);

routes.post("/product/new", auth, storeProduct);
routes.get("/product/all", listAllProducts);
routes.put("/product/:id", auth, updateStockProduct);

export default routes;
