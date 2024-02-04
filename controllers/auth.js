const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.active) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

module.exports = { loginUser };
