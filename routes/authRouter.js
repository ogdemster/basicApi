import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, password } = req.body;
  if (name === "admin" && password === "admin") {
    const token = jwt.sign(name, process.env.SECRET_KEY);
    return res.header("auth-token", token).send("Successfully Logged in");
  }
  res.status(400).send("User not found");
});

export default router;
