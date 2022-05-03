import React from 'react';
import {  Link } from "react-router-dom";
import App from '../App';
import logo from '../logoFiveSteps.png';

import '../App.css';
//bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';

const navbar= () =>{
  return (
    <div>
         <div style={{display: 'flex', justifyContent: 'center', color: 'black'}}>
            <Navbar bg="white" variant="white">
            <Navbar.Brand href="/">
                <img src={logo} alt="some example image" />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/klanten">Klanten</Nav.Link>
                    <Nav.Link href="/Coaches">Coaches</Nav.Link>
                    </Nav>
            </Navbar>
        </div>
    </div>
  );
}
export default navbar;