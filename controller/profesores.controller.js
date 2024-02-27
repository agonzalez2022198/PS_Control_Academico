const bcryptjs = require('bcryptjs');
const Profes = require('../models/profes');
const { response } = require('express');

const profesGet = async (req, res = response) => {

    const {limite, desde} = req.body;
    const query = {estado: true};

    const [total, profes] = await Promise.all([

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

    await profes.save();
    res.status(202).json({
        profes
    });
}


const asignarCursosE = async (req, res = response) => {
    const { id } = req.params;
    const { cursos, ...resto } = req.body;
    try {
        const estudianteY = await Estudiante.findOne({_id: id});
        const cursosY = estudianteY.cursos;
   
        const cursosE = await Curso.find({ _id: { $in: cursos } });
   
        if(cursosE.length > 3){
            throw new Error('No se pueden asignar más de 3 cursos');
        }
        if (cursosE.length !== cursos.length) {
            return res.status(400).json({ error: 'No se encontraron los cursos' });
        }
        for (const curso of cursosE){
            if(cursosY.includes(curso._id)){
            return res.status(400).json({ error: 'Se está asignando un curso qué ya ha sido asignado' });
        }
        }
      const estudiante = await Estudiante.findByIdAndUpdate(id, {
        ...resto,
        cursos,
      });
      res.status(200).json({
        msg: 'Se añadieron los cursos',
        estudiante,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({error: 'No se asignaron los cursos'})
    }
};


module.exports = {
    profesGet,
    getProfesById,
    profesPost,
    asignarCursosE
}