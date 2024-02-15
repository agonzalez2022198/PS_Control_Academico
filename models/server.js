const express = require('express');

const cors = require('cors');

const { dbConnection } = require('../db/config');
// Siguientes variables para las dependencias que instalamos.

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.estudiantePath = '/api/estudiantes';
        this.profPath = '/api/profes';
        this.cursoPath = '/api/cursos';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }


    async conectarDB(){
        await dbConnection();

    }


    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuarioPath, require('../routes/user.routes'));
        this.app.use(this.estudiantePath, require('../routes/estudiante.routes'));
        this.app.use(this.profPath, require('../routes/profes.routes'));
        this.app.use(this.cursoPath, require('../routes/cursos.routes'));
    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    }
}


module.exports = Server;