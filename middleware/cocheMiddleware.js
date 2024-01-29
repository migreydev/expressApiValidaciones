// middleware/cocheMiddleware.js
const { validatePositiveYear } = require('../helpers/db-validators');

// Middleware para validar datos específicos de coches antes de llegar al controlador
exports.validateCocheData = (req, res, next) => {
    // Ejemplo de validación: asegurémonos de que el cuerpo de la solicitud contenga un campo 'modelo'
    if (!req.body.modelo) {
      return res.status(400).json({ error: 'El campo "modelo" es obligatorio para un coche' });
    }
  
    // Puedes agregar más validaciones según tus necesidades

    // Verificar que el campo "anio" sea un número positivo
    /*
    if (anio < 0)) {
     return res.status(400).json({ error: 'El campo "anio" debe ser un número positivo' });
    }

     Verificar la longitud del campo "color"
    if (color.length > 20)) {
    return res.status(400).json({ error: 'El campo "color" debe tener menos de 20 caracteres' });
    }
  */

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
  