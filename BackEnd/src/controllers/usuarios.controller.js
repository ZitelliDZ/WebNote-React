const usuariosCtrl = {};

const sql = require('../database');

const { validationResult } = require('express-validator');




usuariosCtrl.getUsuarios = async (req,res) =>{
    var request = new sql.Request();

    request.query('SELECT * FROM Usuario', (err,rows,field) =>{
        if(err){
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{
            res.json(rows.recordset);
        }
    });
};


usuariosCtrl.createUsuario = async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    const {nombre} = req.body;
    const {apellido} = req.body;
    const {dni} = req.body;
    const {usuario} = req.body;
    const {contraseña} = req.body;

    
    const request = new sql.Request();
            
    request.query(`insert into Usuario (nombre,apellido,dni,usuario,contrasenia) values ('${nombre}','${apellido}','${dni}','${usuario}','${contraseña}')`, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                      
            res.send('Éxito');
        }
    });       
};


usuariosCtrl.getUsuario = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }

    const { usuario } = req.params;
    const request = new sql.Request();

    request.query(`SELECT * FROM Usuario where usuario= '${usuario}'`, (err,rows,field) =>{
        if(err){
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{
            res.json(rows.recordset);
        }
    });
};


usuariosCtrl.updateUsuario = async (req,res) => {

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
   
    const {nombre} = req.body;
    const {apellido} = req.body;
    const {dni} = req.body;
    const {usuario} = req.params;
    console.log(usuario);
    const {contraseña} = req.body;
         
    var request = new sql.Request();


    request.query(`update Usuario set nombre='${nombre}',apellido='${apellido}',dni='${dni}',contrasenia = '${contraseña}' where usuario='${usuario}'`, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error en la Consulta.'});
        }else{                      
            // send records as a response
            if(recordset.rowsAffected == 0){
                res.send('No se Actualizo');
            }else{
                res.send('Éxito');
            }
            
        }
    });
};


usuariosCtrl.deleteUsuario = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    
    var { usuario } = req.params;
    
    var request = new sql.Request();
    
    request.query(`DELETE FROM Usuario WHERE usuario = '${usuario}' `, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                      
            res.send('Éxito');
        }
    });  
};



module.exports = usuariosCtrl;