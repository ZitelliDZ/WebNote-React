import React, { useState } from 'react';

import './FormRegistro.css';

const axios = require('axios');
function FormRegistro(props) {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    var c = false;
    const [b,setB] = useState(false);


    const Registrarse = async (e) =>{
        e.preventDefault(); 
        if(nombre === '' || apellido === '' || dni === '' ||  usuario === '' ||  contraseña === '' ){
            return setB(texto(true,"Datos Incorrectos."));
        }else{
            if(c){
            setB(texto(false,"Procesando."));
            await axios({
                method: 'post',
                url: 'http://localhost:4000/api/usuarios',
                data: {
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    usuario: usuario,
                    contraseña: contraseña
                }})
              .then(function (response) {
                return setB(texto(false,'Registrado.'));
              })
              .catch(function (error) {
                return setB( texto(true,'Usuario ya Registrado.'));
            });
            }
        }
    }


    const texto = (e,b) => {
        if (e) {
            return <p className="text-danger">{b}</p>;
        }else{
            return <p className="text-success">{b}</p>;
        }
    }

    const Volver = (e) => {
        e.preventDefault();     
        props.volver(usuario,contraseña);
    }
  

    return (
        <div className="animation-target container-fluid mt-5 mb-5">
            <div className="row center-xs">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <form className=" card card-body" >
                        <div className="form-group">
                            <input type="text" name="nombre" onChange={(e) => { setNombre(e.target.value); }} className="form-control m-1" placeholder="Nombre" />
                            <input type="text" name="apellido" onChange={(e) => { setApellido(e.target.value); }} className="form-control m-1" placeholder="Apellido" />
                            <input type="text" name="dni" onChange={(e) => { setDni(e.target.value); }} className="form-control m-1" placeholder="DNI" />
                            <input type="text" name="usuario" onChange={(e) => { setUsuario(e.target.value); }} className="form-control m-1" placeholder="Usuario" />
                            <input type="password" name="contraseña" onChange={(e) => { setContraseña(e.target.value); }} className="form-control m-1" placeholder="Contraseña" />
                        </div>
                        <div>{b}</div>
                        <button type="submit" name="Entrar" className="btn btn-danger m-1 " onClick={(e)=>{ c=true; Registrarse(e);}}>Registro</button>
                        <button type="submit" name="Entrar" className="btn  text-primary m-1" onClick={Volver}>Volver</button>
                    </form>
                </div>
            </div>
        </div>


    );
}

export default FormRegistro;