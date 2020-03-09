import React, { useState } from 'react';

import './FormLogin.css';

const axios = require('axios');
function FormLogin(props) {

    const [usuario, setUsuario] = useState(props.usuario);
    const [contraseña, setContraseña] = useState(props.contraseña);
    
    var dni;
    var nombre;
    var apellido;
    var id;

    const [b,setB] = useState('');
    var calendario1;
    var c=false;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        props.resgistrar();
    }

        const handleSubmit2 = (e) =>{
            e.preventDefault(); 
            c=true ; 
            Entrar();
        }
    const Entrar = async (e) =>{
        
        if(usuario === '' ||  contraseña === '' ){
            return setB(texto(true,"Datos Incorrectos."));
        }else{
            if(c){
            setB(texto(false,"Procesando."));


            await axios({
                method: 'get',
                url: `http://localhost:4000/api/usuarios/${usuario}`,
                })
              .then((response1) => {
                  
                
                    if(response1.data[0].contrasenia === contraseña){
                        nombre =  response1.data[0].nombre;
                        apellido =  response1.data[0].apellido;
                        dni = response1.data[0].dni;
                        id = response1.data[0].id;
                        return response1;
                    }else{
                        throw ("Datos Incorrectos.");
                    }
              })
              .then( async response1 => {
                    
                    await axios({
                        method: 'get',
                        url: `http://localhost:4000/api/calendarios/${response1.data[0].id}`,
                        })
                      .then(function (response2) {
                          calendario1=response2.data; 
                          return response1;                              
                      })
                      .catch(function (error) {
                        throw ("Datos Incorrectos.");
                    });
                

              }).then(()=>{
                    props.entrar (
                        id,
                        usuario,
                        contraseña,
                        dni,
                        nombre,
                        apellido,
                        calendario1
                    )
                })
              .catch(function (error) {
                return (setB(texto(true,"Datos Incorrectos.")));
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



    return (
        <div className="animation-target container-fluid mt-5 mb-5">
            <div className="row center-xs">
                <div className="col-xs-12 col-sm-6 col-md-5 col-lg-3">

                    <form className="card card-body" >

                        <div className="form-group">
                            <input type="text" name="usuario" onChange={(e) => { setUsuario(e.target.value); }} className="form-control m-1" placeholder="Usuario" value={usuario}/>
                            <input type="password" name="contraseña" onChange={(e) => { setContraseña(e.target.value); }} className="form-control m-1" placeholder="Contraseña" value={contraseña} />
                        </div>
                        <div>{b}</div>
                        <button type="submit" name="Entrar" className="btn btn-danger m-1" onClick={handleSubmit2}>Entrar</button>
                        <button type="submit" name="Registrarse" className=" btn btn-secondary m-1" onClick={handleSubmit}>Registrarse</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;