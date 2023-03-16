import express from "express";
import bodyParser from "body-parser";

import productRouter from "./routes/productRouter.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/products", productRouter);

app.listen(9000, () => {
  console.log(`App started at http://127.0.0.1:9000`);
});
