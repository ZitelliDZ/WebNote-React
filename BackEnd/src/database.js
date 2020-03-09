const sql = require('mssql');


const config = {
    user: process.env.BDUser,
    password: process.env.BDPassword,
    server: process.env.BDServer,
    database: process.env.BD,
    "options": {
        "encrypt": false,
        "enableArithAbort": true
        }
}


sql.connect(config, function (err) {
    if (err){
        console.log(err);
        console.log('Error al conectarse a la BD.');
        return; 
    }else{
        console.log('La BD esta conectada.');       
    }        
});

module.exports = sql;