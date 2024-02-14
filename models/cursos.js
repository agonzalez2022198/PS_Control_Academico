const { Schema, model } = require('mongoose');

const CursosSchema = Schema({
    nameCurso:{
        type: String,
        required: [true, 'No se puede quedar vacío']
    },
    descripcion:{
        type: String,
        required: [true, 'No se puede quedar vacío']
    }

    
})