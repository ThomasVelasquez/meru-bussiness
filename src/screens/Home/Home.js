import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../services/products/GetProducts";
import { CardProducts } from "../../components/CardProducts/CardProducts";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Home = () => {
  const [products, setProducts] = useState([]);

  async function getListProducts() {
    const data = await getAllProducts();
    setProducts(data?.data);
  }

  console.log(products);

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div>
      <div>
        <Header />
        <Container className="mt-5 mb-5 pb-5" fluid>
          <Row>
            <Col>
              <CardProducts items={products} />
            </Col>
          </Row>
        </Container>
        <div className="mt-5 pt-5">
          <Footer />
        </div>
      </div>
    </div>
  );
};
