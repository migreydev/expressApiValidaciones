const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { getUsers, addUser, updateUser, deleteUser, getUser } = require ('../controllers/users');
const { existsEmail, existsLogin } = require("../helpers/db-validators");

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'No es un id correcto').isMongoId(),
], getUser);

router.post('/', [
    check('nombre', 'Name is required').not().isEmpty(),
    check('login', 'Login is required').not().isEmpty(),
    check('login').custom(existsLogin),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Debe ser una dirección de email válida').isEmail(),
    check('email').custom(existsEmail),
    check('password', 'Password is required').not().isEmpty(),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
    check('rol', 'Rol is required').not().isEmpty(),
    check('rol', 'El rol solo admite los valores ADMIN_ROLE o USER_ROLE').isIn(['ADMIN_ROLE', 'USER_ROLE']),

], addUser);

router.put('/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('nombre', 'Name is required').not().isEmpty(),
], updateUser);

router.delete('/:id', [
    check('id', 'No es un id correcto').isMongoId(),
], deleteUser);

module.exports = router;
