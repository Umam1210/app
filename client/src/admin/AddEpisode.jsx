import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import NavbarAdmin from "../Components/NavbarAdmin";
import icon from "../image/Vector.png";

function AddEpisode() {
  return (
    <>
      <NavbarAdmin />
      <body style={{ backgroundColor: "black", paddingBottom: "100px", paddingTop: "70px" }}>
        <div className="d-flex justify-content-center">
          <div style={{ width: "800px" }} className="bg-dark pb-5 rounded">
            <h2 className="text-light mx-5 py-3">Add Episode</h2>
            <Form className="mx-5">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Title"
                      style={{ width: "400px" }}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <InputGroup className="mb-4 col ">
                    <Form.Control type="file" />
                    <InputGroup.Text id="basic-addon1">
                      <img src={icon} alt="" style={{ height: "20px" }} />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </Form>
            <div>
              <Form.Group
                controlId="formBasicEmail"
                className="d-flex justify-content-center mx-5"
              >

              </Form.Group>
              <Form.Group
                controlId="formBasicEmail"
                className="d-flex justify-content-center mx-5"
              >
                <Form.Control
                  type="text"
                  placeholder="Link Film"
                  style={{ width: "785px" }}
                  className=""
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="danger" className="px-5 py-1 mt-3 mx-5 ">
                Add film
              </Button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default AddEpisode;
