import React from 'react'
import icon from '../icon/img3.png'
import icon2 from '../icon/img2.png'
import icon3 from '../icon/img5.png'
import icon4 from '../icon/img1.png'
import icon5 from '../icon/img6.png'
import icon6 from '../icon/img4.png'
import profil from '../icon/profil.png'
import NavbarUser from '../Components/NavbarUser';

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from 'react-query'
import { API } from '../config/api'
// import {useParams} from 'react-router-dom'





function Profile() {
    const [state, dispatch] = useContext(UserContext)
    // let { id } = useParams();
    console.log("state", state)
    let { data } = useQuery('usersCache', async () => {
        const response = await API.get('/check-auth');
        // console.log("ini response",response)
        return response.data.data;
      });

      console.log(" ini data", data);


      const checkUser = async () => {
        try {
          const response = await API.get('/check-auth');
      
          // If the token incorrect
          if (response.status === 404) {
            return dispatch({
              type: 'AUTH_ERROR',
            });
          }
      
          // Get user data
          let payload = response.data.data.user;
          // Get token from local storage
          payload.token = localStorage.token;
      
          // Send data to useContext
          dispatch({
            type: 'USER_SUCCESS',
            payload,
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        if (localStorage.token) {
          checkUser();}
      }, [])


    // console.log("ini state", state);
    
    return (
            <>
            <NavbarUser />
            <body style={{ backgroundColor: "black" }}>
                <div className="flex py-5">
                    
                    <Container className="bg-dark text-light rounded" style={{ width: "930px" }}>
                        <Row className="">
                            <Col className="flex ms-4">
                                <h2>Personal info</h2>
                                <div className="my-4">
                                    <h5> <img src={icon} alt="" className="me-3" />{data?.name}</h5>
                                    <span className="ms-5 ">Full name</span>
                                </div>
                                <div className="mb-4">
                                    
                                    <h5><img src={icon2} alt="" className="me-3" />{data?.email}</h5>
                                    <span className="ms-5">Email</span>
                                </div>
                                <div className="mb-4">
                                    <h5><img src={icon3} alt="" className="me-3" />Active</h5>
                                    <span className="ms-5">Status</span>
                                </div>
                                <div className="mb-4">
                                    <h5><img src={icon4} alt="" className="me-3" />{data?.gender}</h5>
                                    <span className="ms-5">Gender</span>
                                </div>
                                <div className="mb-4">
                                    <h5><img src={icon5} alt="" className="me-3" />{data?.phone}</h5>
                                    <span className="ms-5">Mobile phone</span>
                                </div>
                                <div className="mb-4">
                                    <h5><img src={icon6} alt="" className="me-3" />{data?.address}</h5>
                                    <span className="ms-5 mt-1">Address</span>
                                </div>
                            </Col>
                            <Col className="m-0 d-flex justify-content-end">
                                <Card
                                    style={{
                                        width: "18rem",
                                        height: "20rem",
                                        background: "#1F1F1F",
                                        borderRadius: "5px",
                                        border: "none",
                                        marginTop: "80px",
                                        marginRight: "30px"
                                    }}
                                >
                                    <Card.Img variant="top" src={profil} />
                                    <Button
                                        variant="danger"
                                        style={{ marginTop: "20px", marginLeft: "0" }}
                                    >
                                        Change Photo Profile
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </body>
        </>
    )
}

export default Profile;