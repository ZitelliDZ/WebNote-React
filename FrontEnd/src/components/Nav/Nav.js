import React, { useState } from 'react';

import './Nav.css';

function Navbar (){
    return(
        <header>
            <div className="logomenu">
                <div className="container-fluid">
                    <div className="row middle-xs center-xs between-xs">
                        <div className="logo col-xs-12 col-md-1 start-md center-xs">
                            <a href="http://localhost:3000/"><h2>WebNote</h2></a>
                        </div>
                        <nav className="menu  col-xs-12 col-md-11 end-md middle-xs center-xs">
                            <a href="http://localhost:3000/" >Registrarse</a>
                            <a href="http://localhost:3000/" >Tus Notas</a>
                        </nav>
                    </div>
                </div>			
            </div>
	    </header>
    )
}

export default Navbar;