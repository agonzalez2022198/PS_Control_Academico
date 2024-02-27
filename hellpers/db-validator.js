const Role = require('../models/role');
const Usuario = require('../models/usuario');

const Estudiante = require('../models/estudiante');
const Profes = require('../models/profes')
const Curso =require('../models/cursos')

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(existeRol){
        throw new Error(`El role ${ role } no existe en la DB`);
    }

}


const existenteEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }


}


const existeUsuarioById = async(id = '') =>{
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el id ${ id } no existe`);
    }

}


const existenteEmailEst = async(correo = '') => {
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está parce`);
    }


}


const existenteEmailProf = async(correo = '') => {
    const existeEmail = await Profes.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está parce`);
    }


}

const existeCursoId = async (id= '') => {
    const existCurs = await Curso.findOne({id});

    if(existCurs){
        throw new Error(`El curso con el id ${id} does not exists`);
    }

}


module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existenteEmailEst,
    existenteEmailProf,
    existeCursoId
}