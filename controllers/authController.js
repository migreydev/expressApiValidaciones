const bcrypt = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email que este activo
        const user = await User.findOne({ email, active: true });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado o no activo' });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Genera el JWT después de verificar la contraseña
        const payload = { uid: user.id };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '4h' });

        // Enviar respuesta al cliente despues de verificar la contraseña
        res.json({
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
