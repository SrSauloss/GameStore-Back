import express from "express";
import { storeProduct } from "./controllers/product.controller.js";

const routes = express.Router();

routes.post("/product/new", storeProduct);

export default routes;
