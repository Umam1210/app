import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/home.css'

import NavbarLogin from "../Components/Navbar";
import Main from "../Components/Main";


function Home() {
  return (
    <>
      <NavbarLogin />
      <Main />
    </>
  );
}

export default Home;
