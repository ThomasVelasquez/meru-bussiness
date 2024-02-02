import React from "react";
import { logoMeru } from "../../assets/images";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import styles from "./FooterStyle.module.css";

export const Footer = () => {
  return (
    <footer className="mt-5 pt-5">
      <Navbar
        expand="lg"
        className={`${styles.background} d-flex justify-content-center`}
      >
        <Navbar.Brand href="/" className="w-25">
          <Image src={logoMeru} alt="logo" className="w-50" fluid />
        </Navbar.Brand>
        <Navbar.Brand className={`text-light ${styles.text} ms-5 `}>
          Copyright © 2024 Meru.
        </Navbar.Brand>
      </Navbar>
    </footer>
  );
};
