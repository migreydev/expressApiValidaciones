const { body, validationResult } = require('express-validator');

// para validar el formato de la contraseña
const validatePasswordFormat = body('password').custom((value, { req }) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    if (!regex.test(value)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, incluyendo una letra minúscula, una mayúscula, un número y un caracter especial.');
    }
    return true;
});

// para validar los resultados de las validaciones
const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validatePasswordFormat, validateResults, validateFields };
