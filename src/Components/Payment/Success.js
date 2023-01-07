import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ButtonToolbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const bestvalue_obj_id = localStorage.getItem("bestvalue_obj_id");
  const cheapest_obj_id = localStorage.getItem("cheapest_obj_id");
  const fastest_obj_id = localStorage.getItem("fastest_obj_id");

  const data = bestvalue_obj_id || fastest_obj_id || cheapest_obj_id;

  const[flag,setFlag]=useState(false)
  const[label_url,setLabel_Url]=useState()

  if (data === cheapest_obj_id) {
    var dataValue = cheapest_obj_id;
  } else if (data === bestvalue_obj_id) {
    dataValue = bestvalue_obj_id;
  } else {
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
          const url=data
          setLabel_Url(url)
          setFlag(true)
        }
      });
  };

  const Home = () => {
    navigate("/");
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }} className="main mt-2">
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
          {flag && <img src={label_url} height="470"></img>}
        </Container>
      </Col>
    </Row>
  );
}

export default Success;
