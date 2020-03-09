import React, { useState } from 'react';

import logo from './logo.svg';

import './logo.css';

function Logo() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xs-12   center-xs ">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Logo;