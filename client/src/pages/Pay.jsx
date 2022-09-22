import React from 'react'
import { Form, InputGroup, Button } from "react-bootstrap";
import NavbarUser from '../Components/NavbarUser';
import icon from '../image/Vector.png'

import { useEffect, useState, useContext, useRef } from 'react'
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from '../config/api'
import { UserContext } from '../context/UserContext'



function Pay() {

  let Navigate = useNavigate();
  let { data: profile, refetch: profileRefetch } = useQuery(
    "profileCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const response = await API.get("/check-auth", config);
      return response.data.data;
    }
  );

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-MIX_q2uR1cvTTgPr";

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
    e.preventDefault()
    // return console.log(profile?.id)
    try {
      const data = {
        user: profile?.id,
      };

      // const body = JSON.stringify(data);

      const config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.token,
          "Content-type": "application/json",
        },
        // body,
      };

      // Insert transaction data
      //langsung mengambil id pada saat post
      const response = await API.post("/transaction", { user: profile?.id }, config);
      console.log("ini transaction", response);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) { }
  });

  document.title = "Dumbflix";

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

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
              <Button variant="danger" size="lg" style={{ marginLeft: "0" }}
                // onClick={() => onBtnClick()}
                type="submit"
              >
                Kirim
              </Button>
            </Form>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="danger" size="lg" className='w-25'
              type='submit'
              onClick={(e) => handleBuy.mutate(e)}


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