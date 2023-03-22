import express from "express";
import config from "../data/config.js";
import sql from "mssql";
import verify from "./verifyToken.js";
import productSchema from "../models/productSchema.js";

const router = express.Router();

router.get("/", verify, async (req, res) => {
  const pool = await sql.connect(config);
  const result = await pool.request().query(`
    SELECT * FROM PRODUCTS
`);

  res.send(result.recordset);
});

router.get("/:id", verify, async (req, res) => {
  const id = req.params.id;
  const pool = await sql.connect(config);
  const result = await pool.request().query(`
    SELECT * FROM PRODUCTS WHERE id=${parseInt(id)}
  `);
  res.send(result.recordset[0]);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const value = await productSchema.validateAsync({ name: name });
    const pool = await sql.connect(config);
    const request = new sql.Request(pool);
    request.input("name", sql.VarChar(50), name);
    const query = `INSERT INTO PRODUCTS (name) values (@name)`;
    const result = await request.query(query);

    res.status(200).send({ message: "Product Succesfully Added!" });
  } catch (error) {
    return res.status(400).send({ Error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const pool = await sql.connect(config);

  const request = new sql.Request(pool);
  request.input("name", sql.VarChar(50), name);
  const query = `UPDATE PRODUCTS SET name=@name WHERE id=${id}`;
  const result = await request.query(query);
  res.status(200).send({ message: "Product updated successfully." });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const pool = await sql.connect(config);
  const result = await pool.request().query(`
    DELETE FROM PRODUCTS WHERE id=${id}
  `);
  res.status(200).send({ message: "Product succesfully deleted" });
});

export default router;
