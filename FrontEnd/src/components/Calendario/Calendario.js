import React, { useState } from 'react';

import LineaCalendario from './LineaCalendario/LineaCalendario';

import './Calendario.css';

const axios = require('axios');
function Calendario(props) {
    
    const [List , setList] = useState(props.List);

    const [nombre, setNombre] = useState(props.nombre);
    const [apellido, setApellido] = useState(props.apellido);
    const [dni, setDni] = useState(props.dni);
    const [usuario, setUsuario] = useState(props.usuario);
    const [contraseña, setContraseña] = useState(props.contraseña);
    var c = false;
    const [b,setB] = useState(false);
    const [nota, setNota] = useState('');



    const ActualizarPerfil = async() =>{
        if(nombre === '' || apellido === '' || dni === '' ||  usuario === '' ||  contraseña === '' ){
            return setB(texto(true,"Datos Incorrectos."));
        }else{
            if(c){
            await axios({
                method: 'put',
                url: `http://localhost:4000/api/usuarios/${usuario}`,
                data: {
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    usuario: usuario,
                    contraseña: contraseña
                }})
              .then(function (response) {
                props.volver(usuario,contraseña);
              })
              .catch(function (error) {
                return setB( texto(true,'Usuario ya Registrado.'));
            });
            }
        }
    }

    const ActualizarCalendario = async (e) =>{
        e.preventDefault();
        if(nota === '' ){
            return ;
        }else{
            
            await axios({
                method: 'post',
                url: `http://localhost:4000/api/calendarios/${props.id}`,
                data: {
                    nota: nota
                }})
              .then(function (response) {
                setNota('');
                setList(response.data);
                console.log(List);
                console.log('1');
              })
              .catch(function (error) {
            });
            
        }
    }

    const BorrarNota = async (idcal) =>{
        console.log(idcal);
        
            
            await axios({
                method: 'delete',
                url: `http://localhost:4000/api/calendarios/${props.id}`,
                data: {
                    id: idcal
                }})
              .then(function (response) {
                setNota('');
                setList(response.data);
              })
              .catch(function (error) {
            });
            
        
    }

   

    
    const ListarCalendario = List.map((calendar,i)=>{
        
        if(List.length>i){
            return <LineaCalendario borrarr={BorrarNota} texto={calendar.nota} i={i} key={i} id={calendar.id} />
        
        }
        return <div></div>;
    })


    const handleSubmit = (e) =>{
        e.preventDefault(); 
        c=true;
        ActualizarPerfil();
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
        <div className="animation-target container mt-5 mb-5">
            <div className="row top-xs center-xs">
                <div className="col-xs-12 col-sm-6 col-md-4 m-5 bot-xs center-xs">
                    <form className=" card card-body " >
                        <div className="form-group">
                            <input type="text" name="nombre" onChange={(e) => { setNombre(e.target.value); }} className="form-control m-1" value={nombre} />
                            <input type="text" name="apellido" onChange={(e) => { setApellido(e.target.value); }} className="form-control m-1" value={apellido} />
                            <input type="text" name="dni" onChange={(e) => { setDni(e.target.value); }} className="form-control m-1" value={dni} />
                            <input type="text" name="usuario" onChange={(e) => { setUsuario(e.target.value); }} className="form-control m-1" value={usuario} disabled />
                            <input type="password" name="contraseña" onChange={(e) => { setContraseña(e.target.value); }} className="form-control m-1" value={contraseña} />
                        </div>
                        <div>{b}</div>
                        <button type="submit" name="Entrar" className="btn btn-dark m-1 " onClick={handleSubmit }>Edit</button>
                        <button type="submit" name="Entrar" className="btn  text-primary m-1" onClick={Volver}>Volver</button>
                    </form>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-6 ">
                    
                    <form className=" card card-body m-5" >
                        <div className="form-group d-flex">
                            <input type="text" name="nota" onChange={(e) => { setNota(e.target.value); }} className="form-control m-1" placeholder="Nueva Nota" value={nota} />  
                            <button type="submit" name="Entrar" className="btn btn-dark m-1 " onClick={ActualizarCalendario }>Agregar</button>
                        </div>                
                    </form>
                   
                    <table className=" table-borderless  table table-hover table-light ">
                        <thead >
                            <tr >
                                <th scope="col" >#</th>
                                <th scope="col" >Notas</th>
                            </tr>
                        </thead>
                        <tbody >
                            {ListarCalendario}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
}



export default Calendario;