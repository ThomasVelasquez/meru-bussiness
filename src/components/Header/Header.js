import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { logoMeru } from "../../assets/images";
import styles from "./HeaderStyle.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/cart");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Navbar expand="lg" className={`${styles.background} w-100`}>
        <Container fluid>
          <Navbar.Brand href="/" className="w-25 ms-5">
            <Image src={logoMeru} alt="logo" className="w-50" fluid />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className={`${styles.burg_toogle}`}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 w-100 d-flex  "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Form className="d-flex justify-content-between align-items-center w-100">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-75"
                  aria-label="Search"
                />
                <div className="d-flex">
                  <Button variant="btn bg-light me-3" onClick={redirect}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Button>
                  <Button variant="btn me-3" className={styles.loginbutton}>
                    Ingresar
                  </Button>
                </div>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="bg-dark text-light w-75 text-center">
        <p>Pregunta por nuestros precios al mayoreo</p>
      </div>
    </div>
  );
};
