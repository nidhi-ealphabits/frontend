import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const bestvalue_obj_id = localStorage.getItem("bestvalue_obj_id");
  const cheapest_obj_id = localStorage.getItem("cheapest_obj_id");
  const fastest_obj_id = localStorage.getItem("fastest_obj_id");

  const data = bestvalue_obj_id || fastest_obj_id || cheapest_obj_id;

  if (data === cheapest_obj_id) {
    var dataValue = cheapest_obj_id;
  } else if (data === bestvalue_obj_id) {
    console.log("in best value");
    dataValue = bestvalue_obj_id;
  } else {
    console.log("in fastest");
    dataValue = fastest_obj_id;
  }

  const getlabel = () => {
    fetch("http://localhost:5600/api/getlabel", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        rate: dataValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined || data !== null || data !== "") {
          navigate("/label", { state: { data } });
        }
      });
  };

  const Home = () => {
    navigate("/");
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }} className="main">
        <Container className="content mt-3" style={{ textAlign: "center" }}>
          <h2>Your Payment Has Been Successfully Received</h2>
          <h4>Thank You for Shopping With Us!</h4>
          <ButtonToolbar className="mt-3 justify-content-between">
            <Button
              variant="success"
              onClick={() => {
                Home();
              }}
            >
              Home
            </Button>
            <Button variant="success" onClick={getlabel}>
              Get Label
            </Button>
          </ButtonToolbar>
        </Container>
      </Col>
    </Row>
  );
}

export default Success;
