import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../icon/logo.png'
import profil from '../image/profil.png'

import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";


function NavbarAdmin() {
  const Navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    Navigate('/')
  }

  return (
    <div className='sticky-top d-flex'>
      <Navbar expand="lg" style={{ backgroundColor: "black" }} className="w-100">
        <Container fluid>
          <div className='p-2 w-100 mx-3' >
            <Link to="/list-transaction">
            <img src={logo} alt="" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
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
                    <Link to="/list-film" className='text-light text-decoration-none'>
                      <CgProfile
                        style={{ color: "red", marginRight: "10px" }}
                        size={30}
                      />
                      Film
                    </Link>

                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="my-2 text-light"
                  onClick={handleLogout}
                  >
                    <Link to="/" className='text-light text-decoration-none' >
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
export default NavbarAdmin;