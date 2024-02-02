import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../services/products/GetProducts";
import styles from "./DetailedProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { oilKit } from "../../assets/images";
import { Footer } from "../../components/Footer/Footer";

export const DetailedProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState("idle");

  async function getAllListProducts() {
    const data = await getAllProducts();
    setProducts(data?.data);
  }

  useEffect(() => {
    getAllListProducts();
  }, []);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  const detail = products?.find((product) => product?.id === id);

  const addCart = () => {
    try {
      if (detail) {
        const productId = detail?.id;
        const existingProduct = cartItems.find(
          (item) => item?.id === productId
        );

        if (existingProduct) {
          const updatedCartItems = cartItems.map((item) =>
            item?.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );

          if (existingProduct.quantity + quantity > 5) {
            setAlertMessage(true);
            setTimeout(() => {
              setAlertMessage("idle");
            }, 2000);
            return;
          }

          setCartItems(updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
          setAlertMessage(false);
          console.log(alertMessage, "alert message");
          const newItem = {
            id: detail?.id,
            name: detail?.name,
            price: detail?.price,
            quantity: quantity, // Asegura que la cantidad sea la misma que la seleccionada
            description: detail?.description,
            image: detail?.image,
          };

          const updatedCartItems = [...cartItems, newItem];
          setCartItems(updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      }
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
    setTimeout(() => {
      setAlertMessage("idle");
    }, 2000);
  };

  const handleIncrement = () => {
    if (quantity < 6) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ height: "80vh" }}>
        <Row className="mt-5">
          <Col md={7}>
            <Image src={oilKit} className="w-75" />
          </Col>
          <Col md={5}>
            <h3>${detail?.price}</h3> {/* Precio total según la cantidad */}
            <p className="fs-4"> {detail?.name} </p>
            <div className="d-flex justify-content-start mb-5">
              <button
                onClick={handleDecrement}
                style={{ display: quantity === 1 ? "none" : "block" }}
                className={`btn me-3 ${styles.button} `}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className={styles.input_number}
              />
              <button
                onClick={handleIncrement}
                style={{ display: quantity === 6 ? "none" : "block" }}
                className={`ms-3 btn ${styles.button}`}
              >
                +
              </button>
              <button
                className={`btn w-50 ms-5 ${styles.button} `}
                onClick={addCart}
              >
                Agregar ${detail?.price * quantity} {/* Precio total */}
              </button>
            </div>
            {alertMessage === true && (
              <div class="alert alert-danger" role="alert">
                No tenemos más unidades en inventario.
              </div>
            )}
            {alertMessage === false && (
              <div class="alert alert-success" role="alert">
                Articulos agregados al carrito.
              </div>
            )}
            <div>
              <p className={`${styles.paragraph} `}>Descripción</p>
              <p className="fs-6">{detail?.description}</p>
              <p className={`${styles.paragraph} `}>Garantia de calidad</p>
              <div className="d-flex gap-2">
                <FontAwesomeIcon className="mt-1" icon={faShieldAlt} />
                <p>
                  Protegemos la calidad tu mercancía por 30 días a partir de su
                  entrega
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
