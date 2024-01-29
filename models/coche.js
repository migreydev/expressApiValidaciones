const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CocheSchema = new Schema({
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    anio: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Coche', CocheSchema);
