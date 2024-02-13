const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada');

    } catch(e){
        throw new Error('Error al momento de conectarse.', e);
    }


}

module.exports = {
    dbConnection
}


//LOs middleawares son para verificar que role está intentando iniciar.