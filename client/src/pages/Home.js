// import { useState } from 'react';
import Header from '../template/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <>
    <Header />
    <Container fluid>

      <Row>
        <Col className='bg-light'>
          <h3>Training settings</h3>
          <p>Choose a framework by clicking on one of the logos below <b>only sklearn is available</b></p>
          <Row>
            <Col className='col-3'>
              <Button href='/sklearn' variant="outline-primary">
                <Image width="100%" height="100%" src="sklearn.png" rounded />sklearn
              </Button>
            </Col>
            <Col className='col-3 gy-1'>
              <Button href='/home' variant="outline-primary disabled">
                <Image width="100%" height="80%" src="pytorch.png" rounded />PyTorch<br />Coming soon
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <h2 className='text-center mb-3'>Generate python code for training powerful machine learning models</h2>
          <p>
            Follow these easy guided steps to get started. This is a free utility for generating 
            machine learning models python code that you can train on your own.
          </p>
          <ul class="list-group">
            <li class="list-group-item">- Click on ML framework icon at the left</li>
            <li class="list-group-item">- Choose model type</li>
            <li class="list-group-item">- Configure dataset</li>
            <li class="list-group-item">- Data preprocessing</li>
            <li class="list-group-item">- Select multiple models to train</li>
            <li class="list-group-item">- Hyperparameter tuning strategy</li>
            <li class="list-group-item">- Download code or docker container</li>
          </ul>
          
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Home;
