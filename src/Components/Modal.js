import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardGroup
} from "react-bootstrap";

function Modal() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state.data;

  const [cheapestAmount, setCheapestAmount] = useState();
  const [bestvalueAmount, setbestvalueAmount] = useState();
  const [fastestAmount, setFastestAmount] = useState();

  const [estDayCheap, setEstDayCheap] = useState();
  const [estDayBest, setEstDayBest] = useState();
  const [estDayFast, setEstDayFast] = useState();

  const calculateRates = () => {
    //bestvalue
    let filters1 = ["BESTVALUE"];
    const filteredResults1 = data.filter((item) =>
      filters1.every((val) => item.attributes.indexOf(val) > -1)
    );

    setEstDayBest(filteredResults1[0].duration_terms);

    setbestvalueAmount((filteredResults1[0].amount * 1.35 + 1).toFixed(2));

    localStorage.setItem("bestvalue_obj_id",filteredResults1[0].object_id)

    localStorage.setItem(
      "bestvalue",
      (filteredResults1[0].amount * 1.35 + 1).toFixed(2)
    );

    ///cheapest
    let filters2 = ["CHEAPEST"];
    const filteredResults2 = data.filter((item) =>
      filters2.every((val) => item.attributes.indexOf(val) > -1)
    );
  
    localStorage.setItem("cheapest_obj_id",filteredResults2[0].object_id)

    setEstDayCheap(filteredResults2[0].duration_terms);

    setCheapestAmount((filteredResults2[0].amount * 1.35 + 1).toFixed(2));

    localStorage.setItem(
      "cheapest",
      (filteredResults2[0].amount * 1.35 + 1).toFixed(2)
    );

    //fastest
    let filters3 = ["FASTEST"];
    const filteredResults3 = data.filter((item) =>
      filters3.every((val) => item.attributes.indexOf(val) > -1)
    );

    localStorage.setItem("fastest_obj_id",filteredResults3[0].object_id)

    setEstDayFast(filteredResults3[0].duration_terms);

    setFastestAmount((filteredResults3[0].amount * 1.35 + 1).toFixed(1));

    localStorage.setItem(
      "fastest",
      (filteredResults3[0].amount * 1.35 + 1).toFixed(1)
    );
  };

  useEffect(() => {
    if (data !== undefined || data !== null || data !== []) {
      calculateRates();
    }
  }, [data]);

  const bestvalue = localStorage.getItem("bestvalue");
  const cheapest = localStorage.getItem("cheapest");
  const fastest = localStorage.getItem("fastest");

  const payment = () => {
    navigate("/payment", { state: { bestvalue } });
    localStorage.removeItem("cheapest_obj_id")
    localStorage.removeItem("fastest_obj_id")

  };

  const payment1 = () => {
    navigate("/payment", { state: { cheapest } });
    localStorage.removeItem("bestvalue_obj_id")
    localStorage.removeItem("fastest_obj_id")
  };

  const payment2 = () => {
    navigate("/payment", { state: { fastest } });
    localStorage.removeItem("cheapest_obj_id")
    localStorage.removeItem("bestvalue_obj_id")
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="main">
          <Container className="content">
            <CardGroup>
                <h1 className="heading">Shipping Rates</h1>

                <Row className="g-3">
                  <Col>
                    <Card style={{ width: "14rem", height: "11rem" }}>
                      <Card.Body>
                        <Card.Title>Best Value : ${bestvalueAmount}</Card.Title>
                        <Card.Text style={{ fontSize: "12px", height: "50px" }}>
                          {" "}
                          {estDayBest}
                        </Card.Text>
                        <div className="d-md-flex justify-content-md-end">
                          <Button onClick={payment} variant="success">
                            Pay
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card style={{ width: "14rem", height: "11rem" }}>
                      <Card.Body>
                        <Card.Title>Cheapest : ${cheapestAmount}</Card.Title>
                        <Card.Text style={{ fontSize: "12px", height: "50px" }}>
                          {estDayCheap}
                        </Card.Text>
                        <div className="d-md-flex justify-content-md-end">
                          <Button onClick={payment1} variant="success">
                            Pay
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card style={{ width: "14rem", height: "11rem" }}>
                      <Card.Body>
                        <Card.Title>Fastest : ${fastestAmount}</Card.Title>
                        <Card.Text style={{ fontSize: "12px", height: "50px" }}>
                          {estDayFast}
                        </Card.Text>
                        <div className="d-md-flex justify-content-md-end">
                          <Button onClick={payment2} variant="success">
                            Pay
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
            </CardGroup>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default Modal;
