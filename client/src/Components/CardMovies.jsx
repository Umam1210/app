import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css";
import data from '../data/data.json'
import { Link } from 'react-router-dom'
// import image from '../image/card.png'

function CardMovies() {
    return (
        <div className="bg-dark">
            <h4 className="text-light ms-3 pt-3">Movies</h4>
            <Row xs={1} md={6} className="mx-2 bg-dark">
                {data.map((item, id) => {
                    return (
                        <Col className="my-3">
                            <Card>
                                <Link to="/detail-film">
                                    <Card.Img variant="top" src={item.image} /></Link>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        This is
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

export default CardMovies;
