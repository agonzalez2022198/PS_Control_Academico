const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuario');
const { response } = require('express');

const usuariosGet = async (req, res = response) => {
    const {limite, desde} = rep.query;
}


//Crear metodo para roles, crear una clase para llevar tokens, esto es para probar el login.

const agregarUsuario = async (req, res) => {
    const {nombre, correo, password, token} = req.body;
    const usuario = new Usuario({nombre, correo, password, token});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    });
}


//Modulos para exportar y usarlos en otras clases

module.exports = {
    agregarUsuario
}