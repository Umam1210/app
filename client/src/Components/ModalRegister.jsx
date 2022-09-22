import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from 'react-query'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'


function ModalRegister() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  document.title = 'Dumbflix';

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password, gender, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);
      console.log(response);

      // Notification
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          email: '',
          password: '',
          name: '',
          gender: '',
          phone: '',
          address: '',
        });
      } else {
        // const alert = (
        //   <Alert variant="danger" className="py-1">
        //     Failed
        //   </Alert>
        // );
        // setMessage(alert);
      }
    } catch (error) {
      // const alert = 
      // (
      // <Alert variant="danger" className="py-1">
      //   Failed
      // </Alert>
      // );
      setMessage(alert);
      console.log(error);
    }
  });



  return (
    <>
      <Button variant="light" onClick={handleShow} className="text-danger me-3 py-1 my-3" type='submit'>
        Register
      </Button>
      {message && message}

      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton className="bg-dark text-danger" style={{ border: "none" }}>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-danger">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                name="name"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                name="gender"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                name="phone"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
            <Form.Group
              className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <input
                type="text"
                placeholder="Address"
                value={address}
                name="address"
                onChange={handleChange}
                className="px-3 py-2 w-100 rounded"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className='bg-dark text-danger' style={{ border: "none" }}>
            <Button className='bg-danger w-100 py-3'
              onClick={(e) => {
                handleClose()
                handleSubmit.mutate(e)
              }}
              type="submit">
              Register
            </Button>
          </Modal.Footer>
       </Modal>
      </form>
    </>
  );
}

export default ModalRegister