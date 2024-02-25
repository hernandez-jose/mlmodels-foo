/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import models from './data/Models';

const ModelType = ( {FieldUpdateAmount, setFieldUpdateAmount} ) => {
  // presistent data
  const [DataManagment, setDataManagment] = useState(() => {
  
    const defaultValues = {
      training_data_location_url: '',
      radioOption: '',
      show_classification: 'd-none',
      show_regression: 'd-none',
      show_clustering: 'd-none',
      data_format: '',
      test_data_split: '25'
    }

    // getting stored value
    const saved = localStorage.getItem("ModelType");
    if(saved == null){
      return defaultValues
    }else{
      return JSON.parse(saved)
    }
  });

  useEffect(() => {
    // code to run after render goes here s3Option
    localStorage.setItem("ModelType", JSON.stringify(DataManagment));
    localStorage.setItem("field_model_type", JSON.stringify(DataManagment.radioOption));
    localStorage.setItem("field_data_format", JSON.stringify(DataManagment.data_format));
    localStorage.setItem("field_training_data_location_url", JSON.stringify(DataManagment.training_data_location_url));
    localStorage.setItem("field_test_data_split", JSON.stringify(DataManagment.test_data_split));
    console.log('ModelType useEffect')
    // training_data_location_url test_data_split
  }, [DataManagment, FieldUpdateAmount]);

  const navigate = useNavigate();

  function handleOnChangeField(value, field){
    var obj = {
      ...DataManagment,
      [field]: value
    }
    setDataManagment(obj)
  }

  function handleOnChangeOption(value){
    var obj = {
      ...DataManagment,
      radioOption: value,
      show_classification: value === 'classification' ? '' : 'd-none',
      show_regression: value === 'regression' ? '' : 'd-none',
      show_clustering: value === 'clustering' ? '' : 'd-none'
    }
    console.log('obj')
    if(DataManagment.radioOption != null){
      localStorage.setItem("ModelNameData", JSON.stringify(models[ DataManagment.radioOption ]) );
    }
    setDataManagment(obj);
    setFieldUpdateAmount(FieldUpdateAmount + 1)
  }

  function handleOnChangeDropdown(value, field){
    var obj = {
      ...DataManagment,
      [field]: value
    }
    setDataManagment(obj)
  }

  function handelOnSubmit(event){
    navigate('/ml-trainer/preprocessing')
    event.preventDefault();
    console.log(event)
  }


  return (
    <>
        {/* <div className="card-body"> */}
            <h4 htmlFor="check_form">Choose model type</h4>
            <div className='form-group'>
            <div className="form-check">
                <input onChange={(e) => handleOnChangeOption(e.target.value)} checked={DataManagment.radioOption === "classification"} className="form-check-input" type="radio" id="classification" value="classification" name="model_type"  />
                <label htmlFor='classification' className="form-check-label">Classification (Used to categorize data into distinct classes)</label>
                <div className={DataManagment.show_classification}>
                <i>
                    Example use cases:
                </i>
                <ul>
                    <li><b>Email Spam Detection</b>: Identifying and filtering out spam emails from users' inboxes by analyzing email content, sender's information, and user's email interaction patterns.</li>
                    <li><b>Fraud Detection in Finance</b>: Detecting fraudulent transactions in banking and finance by analyzing transaction patterns and user behavior to prevent financial loss.</li>
                    <li><b>Image Recognition</b>: Used in various applications like facial recognition, medical imaging diagnosis, and object detection in autonomous vehicles.</li>
                    <li><b>Sentiment Analysis</b>: Analyzing text data from social media, reviews, or surveys to determine the sentiment of the writer, useful in market research and customer service.</li>
                </ul>
                </div>
            </div>
            <div className="form-check">
                <input onChange={(e) => handleOnChangeOption(e.target.value)} checked={DataManagment.radioOption === "regression"} className="form-check-input" type="radio" id="regression" value="regression" name="model_type"  />
                <label htmlFor='regression' className="form-check-label">Regression (Predict continuous output e.g numbers)</label>
                <div className={DataManagment.show_regression}>
                <i>
                    Example use cases:
                </i>
                <ul>
                    <li><b>Website Traffic Analysis</b>: Predicting future website traffic based on historical data, helping in server capacity planning and marketing strategy development.</li>
                    <li><b>Real Estate Valuation</b>: Predicting the value of properties based on features like size, location, age, amenities, and market trends. This helps in fair pricing and investment analysis.</li>
                    <li><b>Risk Assessment in Finance</b>: In finance, regression models assess credit risk by predicting the probability of a default based on customer data. They're also used in pricing insurance policies by predicting claim amounts based on policyholder characteristics.</li>
                    <li><b>Forecasting</b>: In the energy sector, regression is used to predict future energy needs based on historical consumption data, weather patterns, and population growth.</li>
                </ul>
                </div>
            </div>
            <div className="form-check">
                <input onChange={(e) => handleOnChangeOption(e.target.value)} checked={DataManagment.radioOption === "clustering"} className="form-check-input" type="radio" id="clustering" value="clustering" name="model_type"  />
                <label htmlFor='clustering' className="form-check-label">Clustering (discover patterns and similarities in data)</label>
                <div className={DataManagment.show_clustering}>
                <i>
                    Example use cases:
                </i>
                <ul>
                    <li><b>Market Segmentation</b>: Grouping customers based on buying behavior, demographics, or interests to tailor marketing strategies and improve customer service.</li>
                    <li><b>Image Segmentation in Computer Vision</b>: Dividing digital images into multiple segments to simplify image analysis, used in medical imaging, object recognition, and surveillance.</li>
                    <li><b>Recommendation Systems</b>: Clustering similar items or content to recommend products, movies, or music to users on platforms like Amazon, Netflix, or Spotify.</li>
                    <li><b>Anomaly Detection</b>: Isolating unusual data points that differ significantly from the majority of data, used in fraud detection, network security, and fault detection.</li>
                </ul>
                </div>
            </div>
            </div>
            <div className="mt-5 form-group">
            <h4>Configure dataset</h4>
            <div className='col mb-2'>
                <label htmlFor="data_format">Training data format</label>
                <select value={DataManagment.data_format} onChange={e => handleOnChangeDropdown(e.target.value, 'data_format')}  name="data_format" id="data_format" className="form-control">
                <option value="csv">CSV</option>
                <option value="excel">xls, xlsx, xlsm, xlsb, odf, ods and odt file extensions</option>
                <option value="json">JSON</option>
                <option value="xml">XML</option>
                <option value="images">jpeg, jpg, and png in ZIP archive file format</option>
                </select>
            </div>
            <div className="col mb-2">
                <label htmlFor="training_data_location_url">Training data URL (local path or public URL)</label>
                <input type="text" className="form-control" value={DataManagment.training_data_location_url} onChange={e => handleOnChangeField(e.target.value, 'training_data_location_url')} id="training_data_location_url" placeholder="Training data location URL" />
            </div>
            <div className="col">
                <label htmlFor="test_data_split">Test dataset size in % (the rest is used for training)</label>
                <input type="text" className="form-control" value={DataManagment.test_data_split} onChange={e => handleOnChangeField(e.target.value, 'test_data_split')} id="test_data_split" placeholder="25" />
            </div>
            
            </div>
        {/* </div> */}
    </>
  );

};

export default ModelType;
