import React from 'react'
import ReactPlayer from "react-player";
import image2 from  '../image/logo2.png'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NavbarAdmin from '../Components/NavbarAdmin';
import {Link} from 'react-router-dom'



function DetailAdmin() {
  return (
    <>
    <NavbarAdmin />
    <div className="flex bg-dark pb-5">
        <div className="d-flex justify-content-center p-5 bg-dark">
            <ReactPlayer url="https://www.youtube.com/watch?v=SKpSpvFCZRw " />
        </div>
        <div className="d-flex justify-content-end mx-5">
          <Link to='/add-episode'>
        <Button variant='danger'>Add Episode</Button>
        </Link>
        </div>
        <div className="d-flex justify-content-around mt-5">
            <div >
                <Card >
                    <Card.Img style={{ width: "300px" }} variant="top" src="https://i.pinimg.com/originals/f8/5d/d4/f85dd4a50454142c80c291ab328fc5c5.jpg" />
                </Card>
            </div>
            <div className="bg-dark ">
                <img
                    src={image2}
                    alt=""
                    className=""
                    style={{ width: "50%", marginTop: "20px", marginLeft: "100px" }}
                />
                <div className="mt-5">
                    <p style={{ marginLeft: "100px" }} className="text-light">
                        2019
                        <Button variant="outline-light" className="ms-5">
                            TV Series
                        </Button>
                    </p>
                    <p className="text-light d-flex justify-content-center mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, vero aut.</p>
                </div>
                <div></div>
            </div>
            <div >
                <Card style={{ border: "none" }} className="bg-dark">
                    <Card.Body>

                        <ReactPlayer className="w-100" url="https://www.youtube.com/watch?v=SKpSpvFCZRw " />
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
</>
  )
}

export default DetailAdmin