import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useSelector,useDispatch} from 'react-redux'
import { clearLoginStatus } from '../slices/userSlice';

function Header() {
  const {userObject,userSuccess}=useSelector(state=>state.users);
  const dispatch=useDispatch();
  const userLogout=()=>{
    dispatch(clearLoginStatus());
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">FrontLine-News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
               (userSuccess===false) ? 
               <>
               <Nav.Link href="">Signup</Nav.Link>
               <Nav.Link href="">Login</Nav.Link>
               </> : 
               <>
               <Nav.Link href="">Cricket</Nav.Link>
               <Nav.Link href="">Business</Nav.Link>
               <Nav.Link href="">Science</Nav.Link>
               <NavDropdown title={userObject.firstname} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
               </>
            } 
              <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  )
}

export default Header
