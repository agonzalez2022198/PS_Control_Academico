const { Router } = require('express');
const { check } = require('express-validator');


const {
    cursosGet,
    getCursosById,
    cursosPost } = require('../controller/curso.controller');


const {validarCampos} = require('../middleawares');

//const {existenteEmailEst} = require('../hellpers/db-validator');

const router = Router();

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getCursosById),
        validarCampos
    ], getCursosById);

router.post(
    "/",
    [
        check("nameCurso", "El nombre no puede estar vacio").not().isEmpty(),
        check("descripcion", "La descripcion no puede estar vacio").not().isEmpty(),
        check("instructor", "Debe haber un instructor").not().isEmpty(),
        check("precio","Te olvidaste del precio del curso").not().isEmpty()
    ], cursosPost
);

module. exports = router;