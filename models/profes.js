const { Schema, model} = require('mongoose');

const ProfesSchema = Schema({

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


ProfesSchema.methods.toJSON = function(){
    const{ __v, correo, _id, ...profes} = this.toObject();
    profes.uid = _id;
    return profes;

};


module.exports = model('Profes', ProfesSchema);