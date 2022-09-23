import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
// import data from '../data/data.json'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API } from '../config/api'
import { useQuery } from 'react-query'
// import image from '../image/card.png'

function CardFilm() {

    const state = useContext (UserContext)
    console.log("state", state)
    let { data: films } = useQuery('filmsCache', async () => {
        const response = await API.get('/films');
        // console.log("ini response",response)
        return response.data.data;
      });



    return (
        <div className="">
            <h4 className="text-light ms-3 pt-3">TV Series</h4>
            <Row xs={1} md={6} className="mx-2">
                {films?.map((item, id) => {
                    return (
                        <Col className="my-3">
                            <Card  style={{backgroundColor:"black"}} className="text-light border-dark">
                                <Link to={`detail-film-admin/${item.id}`}>
                                    <Card.Img variant="top" src={item.image} /></Link>
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
    );
}

export default CardFilm;
