import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";

const PORT = process.env.PORT | 9000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/products", productRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App started at http://127.0.0.1:9000`);
});
