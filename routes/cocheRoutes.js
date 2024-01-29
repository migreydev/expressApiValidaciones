const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateCocheData } = require('../middleware/cocheMiddleware');
const cocheController = require('../controllers/cocheController');

// Obtener todos los coches
router.get('/', cocheController.getAllCoches);

// Obtener un coche por ID
router.get('/:id', cocheController.getCocheById);

// Crear un nuevo coche (aplicamos el middleware de validación antes de llamar a la función del controlador)
router.post('/', [
    check("marca", 'Marca is required').not().isEmpty(),
    check("modelo", 'Modelo is required').not().isEmpty(),
    check("anio", 'Año is required').not().isEmpty(),
    check("color", 'Color is required').not().isEmpty(),
    validateCocheData
], cocheController.createCoche);

// Actualizar un coche por ID (aplicamos el middleware de validación antes de llamar a la función del controlador)
router.put('/:id', [
    check("marca", 'Marca is required').not().isEmpty(),
    check("modelo", 'Modelo is required').not().isEmpty(),
    check("anio", 'Año is required').not().isEmpty().isNumeric(),
    check("color", 'Color is required').not().isEmpty(),
    validateCocheData
], cocheController.updateCoche);

// Eliminar un coche por ID
router.delete('/:id', cocheController.deleteCoche);

module.exports = router;
