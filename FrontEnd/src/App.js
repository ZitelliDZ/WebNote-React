import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import Logo from './components/LogoReact/LogoReact'
import FormLogin from './components/FormLogin/FormLogin'
import FormRegistro from './components/FormRegistro/FormRegistro';
import Calendario from './components/Calendario/Calendario';

const axios = require('axios');

function App() {


  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [id, setId] = useState('');

  const [formLogin, setFormLogin] = useState(true);
  const [formRegistro, setFormRegistro] = useState(false);
  const [calendario, setCalendario] = useState(false);
  const [calendario2, setCalendario2]= useState('');

  const Entrar = (id,usuario,contraseña,dni,nombre,apellido,calendario1) =>{
    setId(id);
    setDni(dni);
    setNombre(nombre);
    setApellido(apellido);
    setUsuario(usuario);
    setContraseña(contraseña);
    setCalendario2(calendario1);
    console.log(calendario2);
    setFormLogin(false);
    setCalendario(true);
    setFormRegistro(false);
    
  }


  const Registrar = () =>{
    setFormLogin(false);
    setCalendario(false);
    setFormRegistro(true);
  }

  const Volver = (usuario,contraseña) => {
    setUsuario(usuario);
    setContraseña(contraseña);
    setFormLogin(true);
    setCalendario(false);
    setFormRegistro(false);
  }

  const actualizarCalendario = (cal) =>{
    setCalendario2(cal);
    console.log(calendario2);
  }
  


  const main = ()=>{
    if (formLogin){
      return <FormLogin  resgistrar={Registrar} entrar={Entrar}   contraseña={contraseña} usuario={usuario}></FormLogin>;
    }
    if(formRegistro){
      return <FormRegistro volver={Volver}></FormRegistro>;
    }
    if(calendario){
      return <Calendario volver={Volver} actuali={actualizarCalendario} List={calendario2} usuario={usuario} contraseña={contraseña} dni={dni} nombre={nombre} apellido={apellido} id={id}></Calendario>;
    }
  }

  

  return (
    <div className="App">
      <Nav></Nav>
      
      {main()}
      
      <Logo></Logo>
      
    </div>
  );
}




export default App;
