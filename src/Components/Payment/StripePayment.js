import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StripePayment() {
  const PUBLISHABLE_API_KEY =
    "pk_test_51M20gWJWDkJCEupsG0m5ZdudIdN1QmpZWWSRnFesdfDEtTQiHp1dKSgpEDXhJxRttWJnKwfWLf9nOLFp5IUbTcwH00RnV1tdIP";

  const location = useLocation();

  // const bestvalue = localStorage.getItem("bestvalue");
  // const cheapest = localStorage.getItem("cheapest");
  // const fastest = localStorage.getItem("fastest");
  const navigate = useNavigate();

  const data =
    location.state.bestvalue ||
    location.state.fastest ||
    location.state.cheapest;

  if (data === location.state.cheapest) {
    console.log("in cheapest");
    var dataValue = location.state.cheapest;
  } else if (data === location.state.bestvalue) {
    console.log("in best value");
    dataValue = location.state.bestvalue;
  } else {
    console.log("in fastest");
    dataValue = location.state.fastest;
  }

  const [product] = useState({
    name: "Total Amount:",
    price: dataValue,
    productOwner: "KnowledgeHut",
    description:
      "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
    quantity: 1,
  });

  const makePayment = async () => {
    const stripe = await loadStripe(PUBLISHABLE_API_KEY);
    const body = { product };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5600/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const movetoForm = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="main">
          <Container className="content mt-3">
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>
                    Click here to proceed for the payment
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p> Amount: ${product.price} </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={(e) => movetoForm(e)}>
                    Close
                  </Button>
                  <Button
                    variant="btn btn-outline-success"
                    onClick={makePayment}
                  >
                    Proceed Payment
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
}
export default StripePayment;
