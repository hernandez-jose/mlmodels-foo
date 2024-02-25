import React, {useState, useEffect} from 'react';
import Header from '../template/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ModelType from '../components/sklearn/ModelType';
import CodeHighlight from '../components/SyntaxzHighlighter'
import ProgressIndicator from '../components/sklearn/ProgressIndicator'
import DataPreprocessing from '../components/sklearn/DataPreprocessing'
import ModelSelection from '../components/sklearn/ModelSelection';
import ParamTuning from '../components/sklearn/ParamTuning';
import Generate from '../components/sklearn/Generate';

function Sklearn() {

  const [FieldUpdateAmount, setFieldUpdateAmount] = useState(0)
  useEffect(() => {
    // code to run after render goes here s3Option
    console.log('Sklearn useEffect')
    // training_data_location_url
  }, [FieldUpdateAmount] );

  const _setFieldUpdateAmount = value => {
    setFieldUpdateAmount(value);
  }

  return (
    <>
    <Header />
    <Container fluid>

      <Row>

        <Col className='bg-light'>
          
          <h3>Training settings for sklearn</h3>
          <Row className='mb-3'>
            <Col className='col-3'>
              <Button variant="outline-primary active">
                <Image width="100%" height="100%" src="sklearn.png" rounded />sklearn
              </Button>
            </Col>
            <Col className='col-3'></Col>
          </Row>

          {/* choose model type  */}
          <ModelType FieldUpdateAmount={FieldUpdateAmount} setFieldUpdateAmount={_setFieldUpdateAmount} />
          <DataPreprocessing />
          <ModelSelection FieldUpdateAmount={FieldUpdateAmount} setFieldUpdateAmount={_setFieldUpdateAmount} />
          <ParamTuning />
          <Generate />

        </Col>
        
        <Col>
          <ProgressIndicator />

          <CodeHighlight />

        </Col>

      </Row>

    </Container>
    </>
  );
}

export default Sklearn;
