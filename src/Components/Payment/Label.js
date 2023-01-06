import React from 'react'
import { Button, Container, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'


function Label() {
    const navigate=useNavigate();
    const location=useLocation();

    //getting label url
    const label_url=location.state.data;

    const movetoForm=()=>{
        navigate("/")
        localStorage.clear()
    }

  return (
    <Container className='mt-5' style={{textAlign:"center"}}>
      <Image src={label_url} height="500" ></Image>
      <br/>
      <Button
      className='mt-2'
              variant="success"
              onClick={movetoForm}
            >
              Home
            </Button>
    </Container>
  )
}

export default Label
