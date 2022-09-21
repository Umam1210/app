import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from 'react-query'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'

function ModalLogin() {
  const [show, setShow] = useState(false);
   let { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLogin, setIsLogin] = useState();
  // const [, set] = useState(second)


  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);
  // console.log(useContext());

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post('/login', body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.role === 'Admin') {
          navigate('/list-transaction');
        } else {
          navigate('/home');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
 
  });


  return (
    <>
      <Button variant="danger" onClick={handleShow} className="text-light me-3 py-1 my-3">
        Login
      </Button>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton className="bg-dark text-danger" style={{ border: "none" }}>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-danger">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {message && message}
            </Form.Group>
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
          </Modal.Body>
          <Modal.Footer className='bg-dark text-danger' style={{ border: "none" }}>
            <Button variant="danger w-100"
              onClick={(e) => {
                // handleClose()
                handleSubmit.mutate(e)
              }}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default ModalLogin