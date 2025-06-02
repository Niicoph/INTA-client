import express from "express";
import fs from "fs";
import path from "path";
import { applyFilters } from "../utils/applyFilters";

const router = express.Router();
const jsonPath = path.resolve(__dirname, "../data/pafertilizante.json");

function leerJSON() {
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

function escribirJSON(data: any) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

router.get("/", async (req, res) => {
  const data = leerJSON();
  const filtrado = applyFilters(data, req.query);
  res.json(filtrado);
});

router.post("/", (req, res) => {
  const data = leerJSON();
  const nuevo = req.body;
  data.push(nuevo);
  escribirJSON(data);
  res.status(201).json(nuevo);
});

router.put("/:id", (req, res) => {
  const data = leerJSON();
  const id = req.params.id;
  const index = data.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    data[index] = req.body;
    escribirJSON(data);
    res.json(data[index]);
  } else {
    res.status(404).send("Fertilizante no encontrado");
  }
});

router.delete("/:id", (req, res) => {
  let data = leerJSON();
  data = data.filter((i: any) => i.id !== req.params.id);
  escribirJSON(data);
  res.status(204).send();
});

export default router;