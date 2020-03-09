const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require(`morgan`);       // Permite ver las Consultas desde la consola

//configuracion
app.set('port', process.env.PORT || 4000);
app.set('json spaces',2);

// middleware  
app.use(cors());
app.use(morgan(`dev`));
app.use(express.urlencoded({extended: false}));
app.use(express.json());                            // permite recibir json e interprtarlo

//router
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/calendarios',require('./routes/calendarios'));


module.exports = app;

