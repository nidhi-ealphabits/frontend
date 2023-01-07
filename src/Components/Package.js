import React, { useState,useEffect } from "react";
import {
  Form,
  Col,
  Row,
  FloatingLabel,
  Container,
  Button,
  ButtonToolbar,
  Spinner,
} from "react-bootstrap";
import { useNavigate} from "react-router-dom";

function Package() {
  //Navigation Variable
  const navigate = useNavigate();
  // const location=useLocation()
 const ship_to=JSON.parse(localStorage.getItem('ship_to'));
 const ship_from=JSON.parse(localStorage.getItem('ship_from'));

 const [loading, setLoading] = useState(false);
  //package Weight
  const [weight, setWeight] = useState("");
  const [mass_unit, setMass_Unit] = useState("lb");

  //package Dimenions
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  //parcel object for giving response
  const parcel = {
    length: length,
    width: width,
    height: height,
    distance_unit: "in",
    weight: weight,
    mass_unit: "lb",
  };
  
//previousdata
const previous_data=JSON.parse(localStorage.getItem("parcel"))

  //error variable
  const[error,setError]=useState("")

   //isNonWhiteSpace Regex
   const isNonWhiteSpace = /^\S*$/;

//getting previous data
useEffect(() => {
  setTimeout(() => {
    const checkpreviousdata = () => {
      if (previous_data !== null) {
      setHeight(previous_data.height);
      setLength(previous_data.length);
      setWidth(previous_data.width);
      setWeight(previous_data.weight);
      }
    };
    checkpreviousdata()
  });
}, []);

  //Previous Page
  const previouspage = () => {
    localStorage.setItem('parcel', JSON.stringify(parcel));
    navigate("/shipfrom");
  };

  //Getting Rates from Shippo
  const getrates = () => {
    setLoading(true);
    if (
      length.length <= 0 ||
      height.length <= 0 ||
      width.length <= 0 ||
      weight.length <= 0 
    ) {
      setError("All fields are required ");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      length === "" ||
      length === undefined ||
      !isNonWhiteSpace.test(length)
    ) {
      isNonWhiteSpace.test(length)
        ? setError("Length cannot be blank")
        : setError("Blank space is not allowed in the Length");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      height === "" ||
      height === undefined ||
      !isNonWhiteSpace.test(height)
    ) {
      isNonWhiteSpace.test(height)
        ? setError("Height cannot be blank")
        : setError("Blank space is not allowed in the height");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      width === "" ||
      width === undefined ||
      !isNonWhiteSpace.test(width)
    ) {
      isNonWhiteSpace.test(width)
        ? setError("Width cannot be blank")
        : setError("Blank space is not allowed in the width");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      weight === "" ||
      weight === undefined ||
      !isNonWhiteSpace.test(weight)
    ) {
      isNonWhiteSpace.test(weight)
        ? setError("Weight cannot be blank")
        : setError("Blank space is not allowed in the weight");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    fetch("http://localhost:5600/api/getshipmentdetails", {
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
        addressFrom: ship_from,
        addressTo: ship_to,
        parcels: parcel,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined || data !== null || data !== "") {
          navigate("/modal", { state: { data } });
          setLoading(false);
        }
      });
      localStorage.removeItem("ship_to");
      localStorage.removeItem("ship_from");
      localStorage.removeItem("parcel");
  };

  return (
    <Row>
    <Col md={{ span: 8, offset: 2 }} className="main">
    <Container className="content2">
      <h3 className=" mt-2 mb-3">Package Dimensions</h3>
      <Row className="g-2">
        <FloatingLabel
          controlId="floatingInput"
          label="Length"
          className="col col-xs-4 col-md-3"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Width"
          className="col col-xs-4 col-md-3"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Height"
          className="col col-xs-4 col-md-3"
        >
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </FloatingLabel>
      </Row>

      <h3 className="mt-3 mb-3">Package Weight</h3>
      <Row className="g-2">
        <FloatingLabel
          controlId="floatingInput"
          label="Weight"
          className="col col-xs-4 col-md-3"
        >
          <Form.Control type="text" autoComplete="off" placeholder="weight"   value={weight}
            onChange={(e) => setWeight(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mass-Unit"
          className="col col-xs-4 col-md-3"
        >
          <Form.Control type="text" autoComplete="off" placeholder="lb" value={mass_unit} onChange={(e)=>setMass_Unit(e.target.value)} />
        </FloatingLabel>
      </Row>
      {error && <span className="error">{error}</span>}
            <Row className="footer">
        <ButtonToolbar className="mt-3 justify-content-between">
          <Button onClick={previouspage}>Previous</Button>
          <Button style={{width:'120px', height:'50px'}} onClick={getrates} >Get Rates {loading && <Spinner size="sm" animation="border"/>}</Button>
        </ButtonToolbar>
      </Row>
    </Container>
     </Col>
      </Row>
  );
}

export default Package;
