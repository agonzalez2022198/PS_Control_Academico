const { Schema, model, default: mongoose} = require('mongoose');



function arrayLimite (val){
    return val.length <= 3;
}

const UsuarioSchema = Schema({

    //Variables para logearse como usuario.

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role:{
        type: String,
        require: true,
        enum: ["PROFES", "STUDENTS"]
    },
    estado:{
        type: Boolean,
        default: true
    },

    cursos:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        validate: [arrayLimite, 'No pueden haber más de 3 cursos asignados'],
        ref: "Cursos"
    },
    google:{
        type: Boolean,
        default: false
    }



});

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);