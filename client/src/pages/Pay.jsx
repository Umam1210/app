import React from 'react'
import { Form, InputGroup, Button } from "react-bootstrap";
import NavbarUser from '../Components/NavbarUser';
import icon from '../image/Vector.png'

import {useEffect, useState, useContext, useRef} from 'react'
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {API} from '../config/api'
import {UserContext} from '../context/UserContext'



function Pay() {



  
  const [state] = useContext(UserContext);
let navigate = useNavigate();
const [previewSrc, setPreviewSrc] = useState(null);
const [file, setFile] = useState(null);

useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = "Client key here ...";

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);


const handleBuy = useMutation(async (e) => {
  try {
    e.preventDefault();

    const config = {
      headers: {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      },
    };

    // const data = {
    //   user_id: state.user.id,
    // };

    // const body = JSON.stringify(data);

    const response = await API.post("/transaction", config);
    console.log(response);

    // Create variabel for store token payment from response here ...
    const token = response.data.data.token;

    // Init Snap for display payment page with token here ...
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        navigate("/home");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        navigate("/pay");
      },
      onError: function (result) {
        /* You may add your own implementation here */
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("You closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const onChangeFiles = (e) => {
  let fileInfo = e.target.files[0];
  setFile(fileInfo);
  let reader = new FileReader();

  if (e.target.files.length === 0) {
    return;
  }

  reader.onloadend = (e) => {
    setPreviewSrc([reader.result]);
  };

  reader.readAsDataURL(fileInfo);
};

const inputFileRef = useRef(null);

const onBtnClick = () => {
  inputFileRef.current.click();
};



  return (
    <>
      <NavbarUser />
      <body style={{ backgroundColor: "black", paddingBottom: "200px" }}>
        <div className="flex " style={{ paddingTop: "100px", paddingBottom: "100px" }} >
          <h2 className="text-light d-flex justify-content-center">Premium</h2>
          <p className="text-light d-flex justify-content-center">Bayar sekarang dan nikmati streaming film-film kekinian dari <b className="text-danger mx-2 fs-">Dumbflix</b></p>
          <p className="text-light d-flex justify-content-center"><b className="text-danger mx-2 fs-">Dumbflix</b>:888565225542</p>
          <div className="d-flex justify-content-center">
            <Form action="" className="d-grid gap-4 " style={{ width: "380px" }}>
              <Form.Group className="mb-0" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="input your account number"
                />
              </Form.Group>
              <InputGroup className="mb-4 ">
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="file"
                />
                <InputGroup.Text id="basic-addon1">
                  <img src={icon} alt="" />
                </InputGroup.Text>
              </InputGroup>
              <Button variant="danger" size="lg" style={{ marginLeft: "0" }}>
                Kirim
              </Button>
            </Form>
          </div>
            <div className="d-flex justify-content-center mt-3">
            <Button variant="danger" size="lg" className='w-25'
            onClick={() => onBtnClick()}
            
            
            >
                midtrans
              </Button>
            </div>
        </div>
      </body>
    </>
  )
}

export default Pay;