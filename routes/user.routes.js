const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado } = require('../middleawares');

const { 
    usuariosPost,
    usuariosGet, 
    getUsuarioById,
    putUsuarios,
    usuariosDelete,
    asignarCursosE,
visualizarCursosE} = require('../controller/usuario.controller');

const { existenteEmail, esRoleValido, existeUsuarioById, mayorA3 } = require('../hellpers/db-validator');

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

/*router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("role").custom(esRoleValido),
        validarCampos
    ], putUsuarios);*/

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id",
    [   
        validarJWT,
        esAdminRole,
        tieneRolAutorizado('PROFES','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete
);

router.put(
    "/asignarCursosE/:id",
    [
        check('id').custom(mayorA3), // Aquí deberías usar el middleware mayorA3
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], asignarCursosE);


router.get(
        "/visualizarCursosE/:id",
        [
            check('id', 'No es un id válido').isMongoId(),
            check('id').custom(existeUsuarioById),
            validarCampos
        ], visualizarCursosE);


module.exports = router;