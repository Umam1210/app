import React from 'react'
import ReactPlayer from "react-player";
import image2 from  '../image/logo2.png'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NavbarAdmin from '../Components/NavbarAdmin';
import {Link} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { API } from '../config/api'



function DetailAdmin() {
    let { id } = useParams();
    let { data } = useQuery('detailCache', async () => {
        const response = await API.get('/film/' + id);
        // console.log("ini response", response)
        return response.data.data;
    });
  return (
    <>
    <NavbarAdmin />
    <div className="flex bg-dark pb-5">
        <div className="d-flex justify-content-center p-5 bg-dark" style={{height:"100%"}}>
            <ReactPlayer  url={data?.link_film} />
        </div>
        <div className="d-flex justify-content-end mx-5">
          <Link to='/add-episode'>
        <Button variant='danger'>Add Episode</Button>
        </Link>
        </div>
        <div className="d-flex justify-content-around mt-5">
            <div >
                <Card >
                    <Card.Img style={{ width: "300px" }} variant="top" src={data?.image} />
                </Card>
            </div>
            <div className="bg-dark ">
            <h2 className="text-light d-flex justify-content-center">{data?.title}</h2>
                <div className="mt-5">
                    <p style={{ marginLeft: "100px" }} className="text-light">
                       {data?.year}
                        <Button variant="outline-light" className="ms-5">
                            TV Series
                        </Button>
                    </p>
                    <p className="text-light d-flex justify-content-center mt-5">{data?.desc}</p>
                </div>
                <div></div>
            </div>
            <div >
                <Card style={{ border: "none" }} className="bg-dark">
                    <Card.Body>
                        <ReactPlayer className="w-100" url={data?.link_film} onClickPreview />
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
</>
  )
}

export default DetailAdmin