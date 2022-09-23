import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../icon/logo.png'
import profil from '../image/profil.png'

import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'


import { CgProfile } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { UserContext } from '../context/UserContext';





function NavbarUser() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, dispatch] = useContext(UserContext)
  const user = localStorage.getItem('token')

  const Navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    Navigate('/')
  }

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    } else setIsLogin(false)
  }, [state, handleLogout]);


  return (
    <div className='sticky-top' sty>
      <Navbar bg="" expand="lg" style={{background:"black"}}>
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
          
          <Navbar className='text-danger ps-4'>
            <Link to="/home" className='text-light text-decoration-none'>Home</Link>

          </Navbar>
          <Navbar.Toggle aria-controls="navbarScroll" />
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
              <Nav.Link className='text-danger'>
                <Link to="/tv-series" className='text-light text-decoration-none'>TV Series</Link>
              </Nav.Link>
              <Nav.Link className='text-danger'>
                <Link to="/movies" className='text-light text-decoration-none'>Movies</Link>
              </Nav.Link>
            </Nav>
            <div className='d-flex ' style={{ width: "60%", paddingLeft: "240px" }}>
              <Link to="/home">
              <img src={logo} alt="" />
              </Link>
            </div>
            <div>
              <Dropdown style={{ marginRight: "80px" }}>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-menu-align-responsive-1"
                  className="p-0"
                >
                  <img src={profil} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="me-4 bg-dark mt-2">
                  <Dropdown.Item className="my-2 text-light" >
                    <Link to="/profile" className='text-light text-decoration-none'>
                      <CgProfile
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      Profil
                    </Link>

                  </Dropdown.Item>
                  <Dropdown.Item className="my-2 text-light" >

                    <Link to="/pay" className='text-light text-decoration-none'>
                      <MdPayment
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      Pay
                    </Link>

                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="my-2 text-light"
                  onClick={handleLogout}
                  >
                    <Link to="/" className='text-light text-decoration-none'>
                      <RiLogoutCircleLine
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />                 
                      Logout
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarUser;