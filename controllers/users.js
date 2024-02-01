const User = require('../models/users');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getUser = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.find({ _id: idUser });

        if (!user.length) {
            return res.status(404).json({ message: `No existe el usuario con el id ${idUser}` });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUser = async (req, res = response) => {
    try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { nombre, email, password, rol, login } = req.body;

        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'El email esta registrado' });
        }

        const existingLogin = await User.findOne({ login });
        if (existingLogin) {
            return res.status(400).json({ message: 'El login ya esta registrado' });
        }

       
        const passwordEncriptada = await bcrypt.hash(password, 10);

        
        const user = new User({
            nombre,
            email,
            password: passwordEncriptada,
            rol,
            login,
            active: true,
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

const updateUser = async (req, res = response) => {
    const idUser = req.params.id;
    const user = await User.find({ _id: idUser });

    const newUser = req.body;

    if (!user.length) {
        return res.status(404).json({ message: `No existe el usuario con el id ${idUser}` });
    }

    await User.updateOne({ _id: idUser }, newUser);
    res.json({ newUser });
}

const deleteUser = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById(idUser);

        if (!user) {
            return res.status(404).json({ message: `No existe el usuario con el id ${idUser}` });
        }
        user.active = false;
        await user.save();

        res.json({ message: `Usuario con id ${idUser} desactivado correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
