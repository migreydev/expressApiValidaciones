// middleware/cocheMiddleware.js
const { validatePositiveYear } = require('../helpers/db-validators');

// Middleware para validar datos específicos de coches antes de llegar al controlador
exports.validateCocheData = (req, res, next) => {
    if (!req.body.modelo) {
      return res.status(400).json({ error: 'El campo "modelo" es obligatorio para un coche' });
    }

    // Validación del año
    if (req.body.anio) {
        try {
            validatePositiveYear(req.body.anio);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Si pasa la validación, llamamos a la siguiente función de middleware o al controlador
    next();
  };
  