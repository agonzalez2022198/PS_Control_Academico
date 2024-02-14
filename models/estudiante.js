const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Ingresa tu nombre']
    },

    apellidos: {
        type: String,
        required: [true, 'Ingresa tus apellidos']
    },

    carnet: {
        type: String,
        required: [true, 'No puedes dejar vacío.']
    },

    correo: {
        type: String,
        required: [true, 'Necesitar llenar este espacio.'],
        unique: true
    },

    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio.']
    },

    estado:{
        type: Boolean,
        default: true
    }


});


EstudianteSchema.methods.toJSON = function(){
    const {__v, carnet, _id, ...correo } = this.toObject();
    usuario.uid = _id;
    return usuario;

};

module.exports = model ('Estudiante', EstudianteSchema);