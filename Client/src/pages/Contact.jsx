import React from 'react'
import {Card, Container, Col, Row} from "react-bootstrap";

export const Contact = () => {
  return (
    <div style={{minHeight:"43rem"}}>
     <Container className="mt-5">
      <Row className='mb-5'>
        <Col md="3">
        <Card
          bg="secondary"
          text={ "white"}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Address</Card.Header>
          <Card.Body>
           
            <Card.Text>
              Kathmandu, Nepal
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>

        <Col md="3">
        <Card
          bg="secondary"
          text={ "white"}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Email</Card.Header>
          <Card.Body>

            <Card.Text>
              bnagari154@gmail.com
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>

        <Col md="3">
        <Card
          bg="secondary"
          text={ "white"}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Contact</Card.Header>
          <Card.Body>

            <Card.Text>
            https://github.com/Basanti-123
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>

        <Col md="3">
        <Card
          bg="secondary"
          text={ "white"}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Linkedin</Card.Header>
          <Card.Body>
            
            <Card.Text>
              linkedin
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>

      </Row>

      <Row>
       <Col>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
    <h1 className="text-body-emphasis">Basic jumbotron</h1>
    <p className="lead">
      Feel free to reach out to us via email. we are always happy to hear from you!
    </p>
  </div>
  </Col>
      </Row>
      </Container> 
    </div>
  )
}


