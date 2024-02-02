import Card from "react-bootstrap/Card";
import styles from "./CardProductsStyle.module.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Placeholder from "react-bootstrap/Placeholder";

export const CardProducts = ({ items }) => {
  const navigate = useNavigate();

  const detailedProducts = (product) => () => {
    navigate(`/detail/product/${product}`);
  };

  return (
    <div className="container mt-5" >
      <h3>Destacados auto</h3>
      <Container className="mt-5 d-flex flex-wrap justify-content-center gap-2" >
        {!items
          ? items?.map((product) => (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="primary" xs={6} />
                </Card.Body>
              </Card>
            ))
          : items?.map((product) => (
              <Card
                key={product?.id}
                style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
                onClick={detailedProducts(product.id)}
              >
                <Card.Img variant="top" src={product?.image} />
                <p className="bg-dark text-light text-center mb-0">
                  Paga al recibir
                </p>
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {product?.name}
                  </Card.Title>
                  <Card.Text>
                    Desde: <br />
                    <span className="fw-bold">{product?.price}</span>
                  </Card.Text>
                  <Card.Text className={`${styles.description} h-25`}>
                    {product?.description}
                  </Card.Text>
                  <Card.Text className="text-success">Llega mañana</Card.Text>
                </Card.Body>
              </Card>
            ))}
      </Container>
    </div>
  );
};
