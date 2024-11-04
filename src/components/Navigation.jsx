import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"


export default function Navigation(){
    return (

        <Navbar sticky="top" className="bg-white shadow-sm mb-3">
            <Container> 
                <Nav>
                    <Nav.Link to="/" as={NavLink}> Articles </Nav.Link>
                    <Nav.Link to="/topics" as={NavLink}> Topics </Nav.Link>
                </Nav>
            
                <Nav >
                    <Nav.Link to="/login" as={NavLink}> Login </Nav.Link>
                    <Nav.Link to="/logout" as={NavLink}> Logout </Nav.Link>
                </Nav>
                    
            </Container>
        </Navbar>
        
    )
}