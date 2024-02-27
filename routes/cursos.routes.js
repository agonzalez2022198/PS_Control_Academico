const { Router } = require('express');
const { check } = require('express-validator');


const {
    cursosGet,
    getCursosById,
    cursosPost, putCursos, cursoDelete } = require('../controller/curso.controller');


const {validarCampos} = require('../middleawares');

const {existeCursoId} = require('../hellpers/db-validator');

const router = Router();

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getCursosById),
        validarCampos
    ], getCursosById
);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoId),
        validarCampos
    ], putCursos
);


router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoId),
        validarCampos
    ],cursoDelete
);


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