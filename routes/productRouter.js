import express from "express";
import products from "../data/data.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(products);
});

router.get("/:id", (req, res) => {
  const result = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  res.send(result);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  products.push({ id: 3, name: name });
  res.status(200).send({ message: "Product Succesfully Added!" });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }
  products[productIndex] = { ...products[productIndex], name };
  res.status(200).send({ message: "Product added successfully." });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }
  products.splice(productIndex, 1);
  res.status(200).send({ message: "Product succesfully deleted" });
});

export default router;
