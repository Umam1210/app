import React from "react";
import NavbarAdmin from "../Components/NavbarAdmin";
import icon from "../image/Vector.png";

import { Form, InputGroup, FloatingLabel, Button } from "react-bootstrap";
import { useMutation } from 'react-query'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'










function AddFilm() {
   
  const title = "Add Film";
  document.title = "Dumbflix | " + title;
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    image: "",
    year: "",
    desc: "",
    link_film: "",
    category_id: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/categorys");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log("handle change", e.target.name);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set(
        "image",
        form.image[0],
        form.image[0].name
      );
      formData.set("year", form.year);
      formData.set("desc", form.desc);
      formData.set("link_film", form.link_film);
      formData.set("category_id", form.category_id);

      console.log("form",form);

      // Insert film data
      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/list-film");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

const fileInput = useRef(null);
const handleFileInput = (e) => fileInput.current.click();

const [formValues, setFormValues] = useState([{ title: "", link: "" }]);

let handleChange1 = (i, e) => {
  let newFormValues = [...formValues];
  newFormValues[i][e.target.name] = e.target.value;
  setFormValues(newFormValues);
};

let addFormFields = () => {
  setFormValues([...formValues, { title: "", link: "" }]);
};

let handleSubmit1 = (event) => {
  event.preventDefault();
  alert(JSON.stringify(formValues));
};

  return (
    <>
      <NavbarAdmin />
      <body style={{ backgroundColor: "black", paddingBottom: "100px", paddingTop: "70px" }}>
        <div className="d-flex justify-content-center">
          <div style={{ width: "800px" }} className="bg-dark pb-5 rounded">
            <h2 className="text-light mx-5 py-3">Add Film</h2>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form className="mx-5">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      name="title"
                      // value={title}
                      placeholder="Title"
                      onChange={handleChange}
                      style={{ width: "400px" }}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <InputGroup className="mb-4 col ">
                    <Form.Control
                     type="file"
                     name="image"
                    //  value={image}
                     onChange={handleChange}
                
                    />
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
                <Form.Control
                  type="text"
                  name="year"
                  // value={year}
                  placeholder="year"
                  onChange={handleChange}
                 
                />
              </Form.Group>
            </div>
            <div>
            <Form.Group
                controlId="formBasicEmail"
                className="d-flex justify-content-center mx-5"
              >

              <div className='col-10 d-flex justify-content-center w-100 my-3'>
                <select class="form-select" aria-label="Default select example"
                    name="category_id"
                    id="list"
                    onChange={handleChange}
                >
                  <option selected>Category</option>
                  <option value="1" for="tvseries">TV Series</option>
                  <option value="2">Movies</option>

                </select>
              </div>
              </Form.Group>
            </div>
            <div>
              <Form.Group
                controlId="formBasicEmail"
                className="d-flex justify-content-center mx-5 mb-3"
              >
                <Form.Control
                  type="text"
                  name="link_film"
                  // value={year}
                  placeholder="Link film"
                  onChange={handleChange}
                 
                />
              </Form.Group>
            </div>
            <div>
              <FloatingLabel className="mx-5" controlId="floatingTextarea2" label="Description" style={{ width: "100" }}>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="desc"
                  // value={desc}
                  placeholder="desc"
                  onChange={handleChange}
                  style={{ height: '100px' }}

                />
              </FloatingLabel>
            </div>
            {/* <Form className="mx-5 mt-3">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-0" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Title Episode"
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
            </Form> */}
            {/* <div>
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
            </div> */}
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="danger" className="px-5 py-1 mt-3 mx-5 ">
                Add film
              </Button >
            </div>

          </form>
          </div>
        </div>
      </body>

    </>
  );
}


export default AddFilm;
