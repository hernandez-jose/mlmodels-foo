import React, {useState, useEffect} from 'react';

const ProgressIndicator = () => {
    const [DataProgress, setDataProgress] = useState(() => {
  
        const defaultValues = {
          ml_framework: true,
          model_type: false,
          configure_dataset: false,
          data_preprocessing: false,
          model_selection: false,
          hyperparameter_tuning: false,
          export: false
        }
    
        // getting stored value
        const saved = localStorage.getItem("ModelType");
        if(saved == null){
          return defaultValues
        }else{
          return JSON.parse(saved)
        }
    });

    return (
        <>
        <h2 className='text-center mb-3'>Generate python code for training powerful machine learning models</h2>
          <p>
            Follow these easy guided steps to get started. This is a free utility for generating 
            machine learning models python code that you can train on your own.
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item active">- Click on ML framework icon at the left</li>
            <li className="list-group-item">- Choose model type</li>
            <li className="list-group-item">- Configure dataset</li>
            <li className="list-group-item">- Data preprocessing</li>
            <li className="list-group-item">- Select multiple models to train</li>
            <li className="list-group-item">- Hyperparameter tuning strategy</li>
            <li className="list-group-item">- Download code or docker container</li>
          </ul>
        </>
    );
}

export default ProgressIndicator;