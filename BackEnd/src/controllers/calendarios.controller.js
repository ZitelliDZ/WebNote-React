const calendarioCtrl = {};

const sql = require('../database');

const { validationResult } = require('express-validator');



calendarioCtrl.getCalendario = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }

    const { idUsuario } = req.params;
    const request = new sql.Request();

    request.query(`SELECT * FROM Calendario where idUsuario= ${idUsuario}`, (err,rows,field) =>{
        if(err){
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{
            res.json(rows.recordset);
        }
    });
};




calendarioCtrl.createCalendario = async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    const {nota} = req.body;
    const {idUsuario} = req.params;

    
    const request = new sql.Request();
            
    request.query(`insert into Calendario (nota,idUsuario) values ('${nota}',${idUsuario})`, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                
            
            request.query(`SELECT * FROM Calendario where idUsuario= ${idUsuario}`, (err,rows,field) =>{
                if(err){
                    console.log(err);
                    res.status(500).json({error: 'Error En la Consulta.'});
                }else{
                    res.json(rows.recordset);
                }
            });
        }
    });       
};




calendarioCtrl.deleteCalendario = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    
    const { idUsuario } = req.params;
    const { id } = req.body;
    
    const request = new sql.Request();
    
    request.query(`DELETE FROM Calendario WHERE idUsuario = ${idUsuario} and id=${id} `, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                      
            request.query(`SELECT * FROM Calendario where idUsuario= ${idUsuario}`, (err,rows,field) =>{
                if(err){
                    console.log(err);
                    res.status(500).json({error: 'Error En la Consulta.'});
                }else{
                    res.json(rows.recordset);
                }
            });
        }
    });  
};



module.exports = calendarioCtrl;