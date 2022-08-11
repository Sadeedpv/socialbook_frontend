import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsPlus} from 'react-icons/bs'

import icon from '../assets/images/instagram.png'

function Header() {
  return (
    <>
    <Navbar bg="white" className='shadow-sm '>
      <Container>
        <Navbar.Brand href="/"><img src={icon} alt='' className='img-fluid ' style={{
          objectFit: 'contain',
          width: '150px',
        }}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav align-middle">
          <Nav className="ms-auto align-items-center d-flex justify-content-center">
            <Nav.Link href="/addposts"><Button variant="primary">New Post <BsPlus size={25} /> </Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header