import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Footer } from "../../components/Footer/Footer";
import styles from "./CartStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTimes, faPlus} from "@fortawesome/free-solid-svg-icons";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    if (cartItemsString) {
      setCart(JSON.parse(cartItemsString));
    }
  }, []);

  const calculateTotals = () => {
    let totalCart = 0;

    const updatedCart = cart?.map((item, index) => {
      const totalItem = item.price * item.quantity;
      totalCart += totalItem;
      return {
        ...item,
        total: totalItem,
        position: index + 1, // Posición del elemento en el carrito
      };
    });

    return { updatedCart, totalCart };
  };

  const { updatedCart, totalCart } = calculateTotals();

  const handleDecrement = (itemId) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCart(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity >= 1 ? item.quantity + 1 : 1;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCart(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleRemove = (productId) => {
    // Filtra los productos que no coinciden con el ID del producto a eliminar
    const updatedCartItems = cart.filter((item) => item.id !== productId);

    if (updatedCartItems.length === 0) {
      setCart([]);
      localStorage.removeItem("cartItems");
    } else {
      setCart(updatedCartItems);
      // Actualiza el localStorage con el nuevo carrito
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <h3 className="text-center">Carrito</h3>
        <Row>
          <Col xs={12} md={8}>
            {!cart ? (
              <Card>
                <Card.Body>
                  <p>Cargando...</p>
                </Card.Body>
              </Card>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>${item.price}</Card.Title>
                      <Card.Title>{item.quantity}</Card.Title>
                    </div>
                    <Card.Text>{item.description}</Card.Text>
                    <div className="d-flex justify-content-end gap-3">
                      <Button
                        variant="dark"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <Button
                        variant="dark"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                      <Button
                        variant="dark"
                        onClick={() => handleIncrement(item.id)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
          <Col className="mb-5" xs={12} md={4}>
            <div className={`border ${styles.resumenContainer}`}>
              <p className={`${styles.paragraph} mt-3 ms-3`}>Resumen</p>
              {updatedCart.map((item) => (
                <p className="ms-5" key={item.id}>
                  <span className={styles.paragraph}>
                    {`Envío ${item.position}`}
                  </span>
                  : ${item.total}
                </p>
              ))}
              <hr />
              <p className="text-end me-2">
                Total del carrito: <span className="fw-bold">${totalCart}</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
