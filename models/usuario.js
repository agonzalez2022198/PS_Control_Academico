const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    //Variables para logearse como usuario.

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    token: {
        type: String,
        required: [true, 'El token para saber si eres administrador o estudiante.']
    }



});

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = -IdleDeadline;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);