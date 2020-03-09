import React, { useState } from 'react';

import './LineaCalendario.css';

class LineaCalendario extends React.Component{
    
    constructor(props) {
        super(props);
       
        
        this.borrar = this.borrar.bind(this);
      }
    borrar = (e) =>{
        e.preventDefault();
        this.props.borrarr(this.props.id);
    }
    render(){
        return (
            <tr className="borde" >
                <th scope="col">{this.props.i}</th>
                <th scope="col">{this.props.texto}</th>
                <th scope="col"><button className="btn btn-danger" onClick={this.borrar}>X</button></th>
            </tr>
        );
    }
}

export default LineaCalendario;