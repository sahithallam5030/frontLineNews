
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useForm} from 'react-hook-form'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useSelector,useDispatch} from 'react-redux'
import { clearLoginStatus } from '../slices/userSlice';
import { getNews } from '../slices/newsSlice';

function Header() {
  const {userObject,userSuccess}=useSelector(state=>state.users);
  const {register,handleSubmit}=useForm();
  const dispatch=useDispatch();
  const userLogout=()=>{
    localStorage.clear();
    dispatch(clearLoginStatus());
  }
  const searchNewsByName=(query)=>{
    dispatch(getNews(query))
  }
  return (
    <div id='outer-header'>
      <Navbar expand="lg" className="bg-body-tertiary" id='header'>
        <Navbar.Brand href="/">FRONTLINE-NEWS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" id='header-links'>
            <Nav.Link href="/">Home</Nav.Link>
            {
               (userSuccess===false) ? 
               <>
               <Nav.Link href="/signup">Signup</Nav.Link>
               <Nav.Link href="/login">Login</Nav.Link>
               </> : 
               <>
               <Nav.Link onClick={()=>searchNewsByName({id:'cricket'})}>Cricket</Nav.Link>
               <Nav.Link onClick={()=>searchNewsByName({id:'business'})}>Business</Nav.Link>
               <Nav.Link onClick={()=>searchNewsByName({id:'science'})}>Science</Nav.Link>
               <NavDropdown title={userObject.firstname} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
               </>
            } 
              <form className="d-flex" role="search" onSubmit={handleSubmit(searchNewsByName)}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" {...register('id')}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  )
}

export default Header
