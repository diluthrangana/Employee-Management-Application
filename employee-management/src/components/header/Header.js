import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Employees
            </Nav.Link>
            <Nav.Link as={Link} to="/employee" className="nav-link">
              Add Employee
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link">
              Departments
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
