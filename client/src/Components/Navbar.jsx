import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ModalLogin from './ModalLogin';
import Register from './ModalRegister';
import logo from '../icon/logo.png'
import Main from './Main';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API } from '../config/api'
import { useQuery } from 'react-query'




function NavbarLogin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const state = useContext (UserContext)
  console.log("state", state)
  let { data: films } = useQuery('filmsCache', async () => {
      const response = await API.get('/films');
      // console.log("ini response",response)
      return response.data.data;
    });
  return (
    <>
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
      <Main />
      <div className="" style={{backgroundColor:"black"}}>
            <h2 className="text-light ms-3 pt-3 d-flex justify-content-center">Dumbflix Films</h2>
            <Row xs={1} md={6} className="mx-2">
                {films?.map((item, id) => {
                    return (
                        <Col className="my-3">
                            <Card  style={{backgroundColor:"black"}} className="text-light border-dark cursor-pointer">
                              <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.year}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>

    </>
  );
}
export default NavbarLogin;