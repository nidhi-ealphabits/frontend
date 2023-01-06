import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ShipFrom from "./ShipFrom";
import ShipTo from "./ShipTo";
import {Routes,Route} from 'react-router-dom'
import Package from '../Components/Package'
import Modal from "./Modal";
import StripePayment from "./Payment/StripePayment";
import Success from "./Payment/Success";
import Label from "./Payment/Label";

function Main() {
  return (
    <>
          <Container>
            <Routes>
              <Route path="/" element={<ShipTo/>}></Route>
              <Route path="/shipfrom" element={<ShipFrom />}></Route>
              <Route path="/package" element={<Package />}></Route>
              <Route path="/modal" element={<Modal />}></Route>
              <Route path="/payment" element={<StripePayment />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route path="/label" element={<Label />}></Route>
            </Routes>
          </Container>
    </>
  );
}

export default Main;
