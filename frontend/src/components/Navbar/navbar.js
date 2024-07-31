import React from "react";
import {Navbar,Nav} from "react-bootstrap";
import AuthService from "../../services/auth.services";
import { useHistory, useNavigate } from "react-router-dom";

export default function NavigationBar(props) {
 const navigate= useNavigate();

  function logout()
  {   
    AuthService.logout();
    navigate('/login');
  }
  
  return (
    <div className="DashBoard">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Trello Clone</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/dashboard">DashBoard</Nav.Link>
            </Nav>
            <Nav className="justify">
                <Nav.Link>{props.user}</Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}