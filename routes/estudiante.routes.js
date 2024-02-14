const { Router } = require('express');
const { check } = require('express-validator');


const {
    estudiantesGet,
    estudiantesPost,
    getEstudiantesById } = require('../controller/estuduante.controller');


const {validarCampos} = require('../middleawares');

const {existenteEmailEst} = require('../hellpers/db-validator');

const router = Router();

router.get("/", estudiantesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getEstudiantesById),
        validarCampos
    ], getEstudiantesById);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("apellidos", "El apellido no puede estar vacio").not().isEmpty(),
        check("carnet", "El carnet no puede estar vacio").not().isEmpty(),
        check("correo","Este no es un correo válido").isEmail(),
        check("telefono", "El telefono no puede estar vacio").not().isEmpty(),
        check("correo").custom(existenteEmailEst),
        validarCampos,
    ], estudiantesPost
);

module. exports = router;