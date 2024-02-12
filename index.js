const Server = require('../PS_Control_Academico/models/server');

require('dotenv').config();

const server = new Server();

server.listen();