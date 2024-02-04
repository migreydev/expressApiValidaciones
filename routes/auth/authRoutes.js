const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { login } = require('../../controllers/authController');
const { validateFields } = require('../../middleware/validatePassword');

router.post('/login', [
    check('email', 'El email es obligatorio y debe ser un email valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

module.exports = router;
