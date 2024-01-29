const validatePositiveYear = (year) => {
    if (year < 0) {
        throw new Error('El año del coche debe ser un número positivo');
    }
};

module.exports = { validatePositiveYear };