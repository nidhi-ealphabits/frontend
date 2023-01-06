import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Col,
  Row,
  FloatingLabel,
  ButtonToolbar,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ShipTo() {
  //Navigation
  const navigate = useNavigate();

  //ship to variable
  const [ship_to_name, setShip_To_Name] = useState("");
  const [ship_to_address, setShip_To_Address] = useState("");
  const [ship_to_city, setShip_To_City] = useState("");
  const [ship_to_state, setShip_To_State] = useState("");
  const [ship_to_zipcode, setShip_To_Zipcode] = useState("");
  const [ship_to_country, setShip_To_Country] = useState("US");

  //ship to object for geting rates
  const ship_to = {
    name: ship_to_name,
    street1: ship_to_address,
    city: ship_to_city,
    state: ship_to_state,
    zip: ship_to_zipcode,
    country: ship_to_country,
  };

  //object for previous data
  const previous_data = JSON.parse(localStorage.getItem("ship_to"));

  useEffect(() => {
    setTimeout(() => {
      const checkpreviousdata = () => {
        if (previous_data !== null) {
          setShip_To_Name(previous_data.name);
          setShip_To_Address(previous_data.street1);
          setShip_To_City(previous_data.city);
          setShip_To_State(previous_data.state);
          setShip_To_Zipcode(previous_data.zip);
        }
      };
      checkpreviousdata();
    });
  }, []);

  //error variable
  const [error, setError] = useState("");

  //Regex
  const isNonWhiteSpace = /^\S*$/;
  const isWhiteSpace = /^[^\s]+(\s+[^\s]+)*$/

  //nextpage
  const nextpage = (e) => {
    e.preventDefault();
    if (
      ship_to_name.length <= 0 ||
      ship_to_address.length <= 0 ||
      ship_to_city.length <= 0 ||
      ship_to_state.length <= 0 ||
      ship_to_zipcode <= 0
    ) {
      setError("All fields are required ");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      ship_to_name == "" ||
      ship_to_name == undefined ||
      !isWhiteSpace.test(ship_to_name)
    ) {
      isWhiteSpace.test(ship_to_name)
        ? setError("Name cannot be blank")
        : setError("Blank space is not allowed in the Name");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      ship_to_address == "" ||
      ship_to_address == undefined ||
      !isWhiteSpace.test(ship_to_address)
    ) {
      isWhiteSpace.test(ship_to_address)
        ? setError("Address cannot be blank")
        : setError("Blank space is not allowed in the Address");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      ship_to_city == "" ||
      ship_to_city == undefined ||
      !isWhiteSpace.test(ship_to_city)
    ) {
      isWhiteSpace.test(ship_to_city)
        ? setError("City cannot be blank")
        : setError("Blank space is not allowed in the City");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      ship_to_state == "" ||
      ship_to_state == undefined ||
      !isWhiteSpace.test(ship_to_state)
    ) {
      isWhiteSpace.test(ship_to_state)
        ? setError("State cannot be blank")
        : setError("Blank space is not allowed in the State");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else if (
      ship_to_zipcode == "" ||
      ship_to_zipcode == undefined ||
      !isNonWhiteSpace.test(ship_to_zipcode)
    ) {
      isNonWhiteSpace.test(ship_to_zipcode)
        ? setError("Zipcode cannot be blank")
        : setError("Blank space is not allowed in the Zipcode");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    localStorage.setItem("ship_to", JSON.stringify(ship_to));
    navigate("/shipfrom");
  };

  return (
    <>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="main">
          <Container className="content">
            <h2 md={{ span: 8, offset: 2 }} className="heading">
              Ship To
            </h2>
            <Row className="gx-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3 col-md-6"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  value={ship_to_name}
                  onChange={(e) => {
                    setShip_To_Name(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Address"
                className="mb-3 col-md-6"
              >
                <Form.Control
                  type="text"
                  placeholder="Address"
                  autoComplete="off"
                  value={ship_to_address}
                  onChange={(e) => {
                    setShip_To_Address(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Row>

            <Row className="row g-2">
              <FloatingLabel
                controlId="floatingInput"
                label="City"
                className="col col-xs-4 col-md-2"
              >
                <Form.Control
                  type="text"
                  placeholder="city"
                  autoComplete="off"
                  value={ship_to_city}
                  onChange={(e) => {
                    setShip_To_City(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="State"
                className="col col-xs-4 col-md-2"
              >
                <Form.Control
                  type="text"
                  placeholder="state"
                  autoComplete="off"
                  value={ship_to_state}
                  onChange={(e) => {
                    setShip_To_State(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Zipcode"
                className="col col-xs-4 col-md-2"
              >
                <Form.Control
                  type="text"
                  placeholder="zipcode"
                  autoComplete="off"
                  value={ship_to_zipcode}
                  onChange={(e) => {
                    setShip_To_Zipcode(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingSelect"
                label="Country"
                className="form-floating col-xs-12 col-md-6"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={ship_to_country}
                  onChange={(e) => setShip_To_Country(e.target.value)}
                >
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Aland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">
                    Congo, The Democratic Republic of the
                  </option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Cote d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curacao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="SZ">Eswatini</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option vform-floatingalue="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="XK">Kosovo</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="KP">North Korea</option>
                  <option value="MK">North Macedonia</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestine</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Reunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthelemy</option>
                  <option value="SH">
                    Saint Helena, Ascension and Tristan da Cunha
                  </option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and The Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovak Republic</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="KR">South Korea</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option defaultValue value="US">
                    United States
                  </option>
                  <option value="UM">
                    United States Minor Outlying Islands
                  </option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </Form.Select>
              </FloatingLabel>
            </Row>
            {error && <span className="error">{error}</span>}
            <Row>
              <ButtonToolbar className="mt-3 justify-content-end">
                <Button onClick={nextpage}>Next</Button>
              </ButtonToolbar>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default ShipTo;
