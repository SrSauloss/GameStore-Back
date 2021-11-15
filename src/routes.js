import express from "express";
import auth from "./middlewares/auth.js";
import { signUp } from "./controllers/signUp.controller.js";
import { signIn } from "./controllers/signIn.controller.js";
import {
  updateStockProduct,
  listAllProducts,
  storeProduct,
  listProduct,
  listProductsCategory,
} from "./controllers/product.controller.js";
import {
  listAllCategories,
  storeCategorie,
} from "./controllers/category.controller.js";
import { storeTransaction } from "./controllers/transaction.controller.js";

const routes = express.Router();

routes.post("/sign-up", signUp);
routes.post("/sign-in", signIn);

routes.post("/product/category/new", auth, storeCategorie);
routes.get("/product/categories", auth, listAllCategories);

routes.post("/product/transaction/new", auth, storeTransaction);

routes.post("/product/new", auth, storeProduct);
routes.get("/product/all", listAllProducts);
routes.put("/product/:id", auth, updateStockProduct);
routes.get("/product/:id", auth, listProduct);
routes.get("/product/category/:id", auth, listProductsCategory);

export default routes;
