const Role = require('../models/role');
const Usuario = require('../models/usuario');

const Estudiante = require('../models/estudiante');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findIne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la DB`);
    }

}


const existenteEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(!existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }


}


const existeUsuarioById = async(id = '') =>{
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario con el id ${ id } no existe`);
    }

}


const existenteEmailEst = async(correo = '') => {
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está parce`);
    }


}


module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existenteEmailEst
}