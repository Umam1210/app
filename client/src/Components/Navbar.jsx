import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ModalLogin from './ModalLogin';
import Register from './ModalRegister';
import logo from '../icon/logo.png'






function NavbarLogin() {
  return (
    <div className='sticky-top d-flex w-100'>
      <Navbar expand="lg" style={{ backgroundColor: "black" }} className="w-100">
        <Container fluid>
          <div className='p-2 w-100 mx-3' >
            <img src={logo} alt="" />
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Register />
            <ModalLogin />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarLogin;