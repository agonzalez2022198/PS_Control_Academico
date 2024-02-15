const { Schema, model } = require('mongoose');

const CursosSchema = Schema({
    nameCurso:{
        type: String,
        required: [true, 'No se puede quedar vacío']
    },
    descripcion:{
        type: String,
        required: [true, 'No se puede quedar vacío']
    },
    instructor:{
        type: String,
        required: [true, 'Instructor a cargo']
    },
    precio: {
        type: String,
        required: [true, 'No puede estar vacío']
    },
    estado: {
        type: Boolean,
        default: true
    }

    
});

CursosSchema.methods.toJSON = function(){
    const{ __v, descripcion, _id, ...cursos} = this.toObject();
    cursos.uid = _id;
    return cursos;
};

module.exports = model('Cursos', CursosSchema);