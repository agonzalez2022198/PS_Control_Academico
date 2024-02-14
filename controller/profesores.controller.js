const bcryptjs = require('bcryptjs');
const Profes = require('../models/profes');
const { response } = require('express');

const profesGet = async (req, res = response) => {

    const {limite, desde} = req.body;
    const query = {estado: true};

    const [tltal, profes] = await Promise.all([

        Profes.countDocuments(query),
        Profes.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        profes
    });

}


const getProfesById = async (req, res) => {
    const {id} = req.params;
    const profes = await Profes.findOne({_id: id});

    res.status(200).json({
        profes
    });
}


const profesPost = async (req, res) => {
    const {nombre, apellidos, carnet, correo, telefono, estado} =req.body;
    const profes = new Profes({nombre, apellidos, carnet, correo, telefono, estado});

    await estudiante.save();
    res.status(202).json({
        profes
    });
}


module.exports = {
    profesGet,
    getProfesById,
    profesPost
}