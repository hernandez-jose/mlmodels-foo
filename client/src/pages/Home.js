// import { useState } from 'react';
import Header from '../template/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Home() {
  return (
    <>
    <Header />
    <Container fluid>
      <h2 className='text-center'>Generate python code that trains machine learning models</h2>

      <Row>
        <Col md={4}></Col>
        <Col md={2}>
          <Image width="100%" height="100%" src="sklearn.png" rounded />
        </Col>
        <Col md={2}>
          <Image width="100%" height="80%" src="pytorch.png" rounded />
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col className='bg-light'>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
    </>
  );
}

export default Home;
