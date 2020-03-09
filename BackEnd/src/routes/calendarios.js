const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { getCalendario,createCalendario,deleteCalendario} = require('../controllers/calendarios.controller');

    
        
    
    

router.route('/:idUsuario')
    .get([check('idUsuario').isNumeric()],getCalendario)
    .post([
        check('idUsuario').isNumeric(),
        check('nota').isLength({ min: 3 , max: 255 }) 
        ],createCalendario)
    .delete([
        check('idUsuario').isNumeric(),
        check('id').isNumeric()
    ],deleteCalendario);

module.exports = router;

