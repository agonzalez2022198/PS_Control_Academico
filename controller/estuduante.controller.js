const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const { response } = require('express');

const estudiantesGet = async (req, res=response) => {
    const {limite, desde} = req.body;
    const query = {estado: true};

    const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.status(200).json({
        total,
        estudiantes
    });


    
}



const getEstudiantesById = async (req, res) => {
    const {id} = req.params;
    const estudiante = await Estudiante.findOne({_id: id});

    res.status(200).json({
        estudiante
    })
}


const estudiantesPost = async (req, res) => {
    const {nombre, apellidos, carnet, correo, telefono, estado} =req.body;
    const estudiante = new Estudiante({nombre, apellidos, carnet, correo, telefono, estado});

    await estudiante.save();
    res.status(202).json({
        estudiante
    });
}


module.exports = {
    estudiantesGet,
    estudiantesPost,
    getEstudiantesById
}