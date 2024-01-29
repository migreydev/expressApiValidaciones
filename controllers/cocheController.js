// cocheController.js

const Coche = require('../models/coche');

// Obtener todos los coches
exports.getAllCoches = async (req, res) => {
    try {
      const coches = await Coche.find();
      res.status(200).json(coches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };

// Obtener un coche por su ID
exports.getCocheById = async (req, res) => {
  try {
    const coche = await Coche.findById(req.params.id);
    if (!coche) {
      return res.status(404).json({ error: 'Coche no encontrado' });
    }
    res.status(200).json(coche);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo coche
exports.createCoche = async (req, res) => {
    try {
      const nuevoCoche = await Coche.create(req.body);
      res.status(201).json(nuevoCoche); // Devolver el nuevo coche creado en la respuesta
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };

// Actualizar un coche por su ID
exports.updateCoche = async (req, res) => {
  try {
    const coche = await Coche.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!coche) {
      return res.status(404).json({ error: 'Coche no encontrado' });
    }
    res.status(200).json(coche);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar un coche por su ID
exports.deleteCoche = async (req, res) => {
  try {
    const coche = await Coche.findByIdAndDelete(req.params.id);
    if (!coche) {
      return res.status(404).json({ error: 'Coche no encontrado' });
    }
    res.status(200).json({ mensaje: 'Coche eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

