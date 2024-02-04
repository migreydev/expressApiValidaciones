const validatePositiveYear = (year) => {
    if (year < 0) {
        throw new Error('El año del coche debe ser un número positivo');
    }
};

const User = require('../models/users');

const existsLogin = async (login) => {
    const user = await User.findOne({ login });
    if (user) {
        throw new Error('El login ya está registrado');
    }
};

const existsEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('El email ya está registrado');
    }
};

module.exports = { validatePositiveYear, existsLogin, existsEmail };
