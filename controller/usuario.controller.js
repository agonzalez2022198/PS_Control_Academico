const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuario');
const Curso = require('../models/cursos');
const { response } = require('express');

const usuariosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });

}


//Cambiar para roles de estudiante y profesores


//Crear metodo para roles, crear una clase para llevar tokens, esto es para probar el login.


const visualizarCursosE = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });
    const cursos = usuario.cursos;
    const cursosE = await Curso.find({ _id: { $in: cursos } });
    const nombresCursos = cursosE.map(curso => curso.nameCurso)
    res.status(200).json({
      msg: `Los cursos del estudiante son los siguientes: ${nombresCursos.join(', ')}`,
    });
};


const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}


const putUsuarios = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = Usuario.findOne({id});

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        usuario
    });
}


const usuariosDelete = async (req, res) => {

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: "Usuario a eliminar",
        usuario,
        usuarioAutenticado,
        msg: "Eliminado el usuario men"
    });
}


const usuariosPost = async (req, res) => {
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    });
}


const asignarCursosE = async (req, res = response) => {
    const { id } = req.params;
    const { cursos, ...resto } = req.body;
    try {
        const usuarioY = await Usuario.findOne({_id: id});
        if (!usuarioY) {
            return res.status(400).json({ error: 'No se encontró el usuario' });
        }
        const cursosY = usuarioY.cursos; // Aquí podría estar el problema
   
        const cursosE = await Curso.find({ _id: { $in: cursos } });
   
        if(cursosE.length > 3){
            throw new Error('No se pueden asignar más de 3 cursos');
        }
        if (cursosE.length !== cursos.length) {
            return res.status(400).json({ error: 'No se encontraron los cursos' });
        }
        for (const curso of cursosE){
            if(cursosY.includes(curso._id)){ // Aquí también podría estar el problema
                return res.status(400).json({ error: 'Se está asignando un curso que ya ha sido asignado' });
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
            ...resto,
            cursos,
        });

        res.status(200).json({
            msg: 'Se añadieron los cursos',
            usuario: usuarioActualizado
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({error: 'No se asignaron los cursos'})
    }
};








//Modulos para exportar y usarlos en otras clases

module.exports = {
    usuariosGet,
    getUsuarioById,
    putUsuarios,
    usuariosDelete,
    usuariosPost,
    asignarCursosE,
    visualizarCursosE

}