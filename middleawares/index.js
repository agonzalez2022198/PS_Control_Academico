const validarCampos  = require('../middleawares/validar-campos');
const validarJWT  = require('../middleawares/validar-jwt');
const  esAdminRole  = require('../middleawares/validar-roles');
const  tieneRolAutorizado  = require('../middleawares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...tieneRolAutorizado
}