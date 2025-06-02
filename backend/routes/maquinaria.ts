import express from 'express';
import fs from 'fs';
import path from 'path';
import { applyFilters } from '../utils/applyFilters';

const router = express.Router();
const jsonPath = path.resolve(__dirname, '../data/maquinaria.json');

function leerJSON() {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

function escribirJSON(data: any) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// Obtener todos los tractores e implementos
router.get('/', (_, res) => {
  const data = leerJSON();
  res.json(data);
});

// Obtener tractores con filtros
router.get('/tractores', (req, res) => {
  const data = leerJSON();
  let tractores = data.tractores;
  tractores = applyFilters(data.tractores, req.query);
  res.json(tractores);
});

// Alta tractor
router.post('/tractores', (req, res) => {
  const data = leerJSON();
  const nuevo = req.body;
  data.tractores.push(nuevo);
  escribirJSON(data);
  res.status(201).json(nuevo);
});

// Modificación tractor
router.put('/tractores/:id', (req, res) => {
  const data = leerJSON();
  const id = req.params.id;
  const index = data.tractores.findIndex((t: any) => t.id === id);
  if (index !== -1) {
    data.tractores[index] = req.body;
    escribirJSON(data);
    res.json(data.tractores[index]);
  } else {
    res.status(404).send('Tractor no encontrado');
  }
});

// Baja tractor
router.delete('/tractores/:id', (req, res) => {
  const data = leerJSON();
  const id = req.params.id;
  data.tractores = data.tractores.filter((t: any) => t.id !== id);
  escribirJSON(data);
  res.status(204).send();
});

// Obtener implementos con filtros 
router.get('/implementos', (req, res) => {
  const data = leerJSON();
  let implementos = data.implementos;
  implementos = applyFilters(data.implementos, req.query);
  res.json(implementos);
});

// Alta implemento
router.post('/implementos', (req, res) => {
  const data = leerJSON();
  const nuevo = req.body;
  data.implementos.push(nuevo);
  escribirJSON(data);
  res.status(201).json(nuevo);
});

// Modificación implemento
router.put('/implementos/:id', (req, res) => {
  const data = leerJSON();
  const id = req.params.id;
  const index = data.implementos.findIndex((i: any) => i.id === id);
  if (index !== -1) {
    data.implementos[index] = req.body;
    escribirJSON(data);
    res.json(data.implementos[index]);
  } else {
    res.status(404).send('Implemento no encontrado');
  }
});

// Baja implemento
router.delete('/implementos/:id', (req, res) => {
  const data = leerJSON();
  const id = req.params.id;
  data.implementos = data.implementos.filter((i: any) => i.id !== id);
  escribirJSON(data);
  res.status(204).send();
});

export default router;
