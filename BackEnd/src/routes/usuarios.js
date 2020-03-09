const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { getUsuarios,createUsuario,getUsuario,updateUsuario,deleteUsuario} = require('../controllers/usuarios.controller');

router.route('/')
    .get(getUsuarios)
    .post([
        check('nombre').isLength({ min: 3 , max: 255 }),
        check('apellido').isLength({ min: 3 , max: 255 }),
        check('dni').isLength({ min: 8 , max: 8 }),
        check('usuario').isLength({ min: 3 , max: 255 }),
        check('contraseña').isLength({ min: 3 , max: 255 }),
        ],createUsuario);
        
    
    

router.route('/:usuario')
    .get([check('usuario').isLength({ min: 3 , max: 255 })],getUsuario)
    .put([
        check('nombre').isLength({ min: 3 , max: 255 }),
        check('apellido').isLength({ min: 3 , max: 255 }),
        check('dni').isLength({ min: 8 , max: 8 }),
        check('usuario').isLength({ min: 3 , max: 255 }),
        check('contraseña').isLength({ min: 3 , max: 255 }),
        ],updateUsuario)
    .delete([check('usuario').isLength({ min: 3 , max: 255 })],deleteUsuario);

module.exports = router;

