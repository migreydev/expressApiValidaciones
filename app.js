// Importamos dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Importamos las rutas de coches
const cocheRoutes = require('./routes/cocheRoutes');
const authRouter = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/users"); 

const app = express();

require('dotenv').config();
mongoose.set("strictQuery", false);

// Habilitar CORS para manejar las solicitudes
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRoutes);

// Conectamos a la base de datos
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`);
    } catch (err) {
        console.log(err);
    }
}

// Llamamos a la función para conectar a la base de datos
main().catch((err) => console.log(err));

// Usamos las rutas de coches
app.use('/coches', cocheRoutes);

// Iniciamos el servidor
app.listen(process.env.PORT, () => {
    console.log(`El servidor en funcionamiento en el puerto ${process.env.PORT}`);
});
