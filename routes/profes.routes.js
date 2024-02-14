const { Router } = require('express');
const {check} = require('express-validator');

const {
    profesGet,
    getProfesById,
    profesPost } = require('../controller/profesores.controller');


const {validarCampos} = require('../middleawares');

const {existenteEmailProf} = require('../hellpers/db-validator');


const router = Router();

router.get("/", profesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getProfesById),
        validarCampos
    ], getProfesById);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("apellidos", "El apellido no puede estar vacio").not().isEmpty(),
        check("carnet", "El carnet no puede estar vacio").not().isEmpty(),
        check("correo","Este no es un correo válido").isEmail(),
        check("telefono", "El telefono no puede estar vacio").not().isEmpty(),
        check("correo").custom(existenteEmailProf),
        validarCampos,
    ], profesPost
);



module.exports = router;