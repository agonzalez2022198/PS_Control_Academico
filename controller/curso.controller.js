const bcryptjs = require('bcryptjs');
const Cursos = require('../models/cursos');
const { response } = require('express');

const cursosGet = async (req, res = response) => {
    const {limite, desde} = req.body;

    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Cursos.countDocuments(query),
        Cursos.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });


}


const getCursosById = async (req, res) => {
    const {id} = req.params;
    const cursos = await Usuario.findOne({_id: id});

    res.status(200).json({
        cursos
    });
}


const cursoDelete = async (req, res) => {
    const {id} = req.params;
    const {curso} = await Cursos.findByIdAndUpdate(id, {estado: false});
    res.status(200).json({
        curso,
        msg: 'Eliminado exitosamente'
        
    });
}

const putCursos = async (req, res = response) =>{
    const {id} = req.params;
    const { _id, ...resto } = req.body;
    

    const curso = await Cursos.findByIdAndUpdate(id, resto);

    res.status(200).json({
        curso,
        msg: 'Curso actualizado!!'
        
    });
}


const cursosPost = async (req, res) => {
    const {nameCurso, descripcion, instructor, precio} = req.body;
    const cursos = new Cursos({nameCurso, descripcion, instructor, precio});

    await cursos.save();
    res.status(202).json({
        cursos
    });
}


module.exports = {
    cursosGet,
    getCursosById,
    cursosPost,
    cursoDelete,
    putCursos
}