import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const DATA_FILE = "./points.json";

// Verileri oku
const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Verileri yaz
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Tüm noktaları getir
router.get("/", (req, res) => {
  const data = readData();
  res.json(data);
});

// Yeni bir nokta ekle
router.post("/", (req, res) => {
  const data = readData();
  const newPoint = req.body;
  newPoint.id = uuidv4();
  data.push(newPoint);
  writeData(data);
  res.status(201).json(newPoint);
});

// Bir noktayı sil
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = req.params.id;
  const newData = data.filter((point) => point.id !== id);
  writeData(newData);
  res.status(204).send();
});

export default router;
