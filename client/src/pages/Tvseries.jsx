import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/tvseries.css'


import image1 from "../image/logo3.png";
import image2 from "../image/text3.png";
import Button from "react-bootstrap/Button";
import Cardtv from "../Components/CardTvSeries";
import NavbarUser from "../Components/NavbarUser";


function Tvseries() {
  return (
    <>
      <NavbarUser />
      <div className="Tvseries">
        <div>
          <img
            src={image1}
            alt=""
            className=""
            style={{ width: "10%", marginTop: "100px", marginLeft: "100px" }}
          />
        </div>
        <div>
          <img
            src={image2}
            alt=""
            className=""
            style={{ width: "40%", marginTop: "20px", marginLeft: "100px" }}
          />
        </div>
        <div className="mt-5">
          <p style={{ marginLeft: "100px" }} className="text-light">
            2019
            <Button variant="outline-light" className="ms-5">
              TV Series
            </Button>
          </p>
        </div>
        <div>
          <Button
            variant="danger"
            style={{ width: "20%", marginTop: "30px", marginLeft: "100px" }}
          >
            Watch Now!
          </Button>
        </div>
      </div>
      <Cardtv />
    </>
  );
}

export default Tvseries;
