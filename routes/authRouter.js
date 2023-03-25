import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import jwt from "jsonwebtoken";

import userSchema from "../models/userSchema.js";

import config from "../data/config.js";
import sql from "mssql";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const value = await userSchema.validateAsync({
      name: name,
      password: password,
    });
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    request.input("name", sql.VarChar(50), name);
    request.input("password", sql.VarChar(50), password);
    const query = `SELECT * FROM ApiUsers
      WHERE name=@name AND password=@password`;
    const result = await request.query(query);
    console.log(result);
    if (result.recordset.length > 0) {
      const token = jwt.sign(name, process.env.SECRET_KEY);
      return res.header("auth-token", token).send("Successfully Logged in");
    }
    res.status(400).send("User not found");
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
});

router.post("/newuser", async (req, res) => {
  try {
    const { name, password } = req.body;
    const value = await userSchema.validateAsync({
      name: name,
      password: password,
    });
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    request.input("name", sql.VarChar(50), name);
    request.input("password", sql.VarChar(50), password);
    const query = `INSERT INTO ApiUsers (name, password) VALUES (@NAME, @PASSWORD)`;
    const result = await request.query(query);
    res.status(200).send({ message: "User successfully added!" });
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
});

export default router;
