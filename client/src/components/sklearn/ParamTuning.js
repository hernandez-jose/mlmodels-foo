import React, {useState, useEffect} from 'react';

const ParamTuning = () => {

    const [FieldUpdateAmount, setFieldUpdateAmount] = useState(0)
    const [ParamTuningStrategy, setParamTuningStrategy] = useState(() => {
  
        const defaultValues = ""
    
        // getting stored value
        const saved = localStorage.getItem("field_tuning");
        if(saved == null){
          return defaultValues
        }else{
          return JSON.parse(saved)
        }
    });

    function handleOnChangeField(value){
        let temp = ParamTuningStrategy
        temp = value
        setParamTuningStrategy(temp)
        setFieldUpdateAmount(FieldUpdateAmount + 1)
    }

    useEffect(() => {
        // code to run after render goes here s3Option
        localStorage.setItem("field_tuning", JSON.stringify(ParamTuningStrategy));
        // training_data_location_url
    }, [ParamTuningStrategy, FieldUpdateAmount]);

    return (
        <>
        <h4 className='mt-3'>Hyperparameter tuning strategy</h4>
        <select onChange={e => handleOnChangeField(e.target.value)} name={'tuning'} id={'tuning'} className="form-control xs" defaultValue={ParamTuningStrategy}>
            <option value="GridSearchCV">Exhaustive search (very slow)</option>
            <option value="RandomizedSearchCV">Randomized search (fast)</option>
            <option value="default">Model default hyperparameters</option>
        </select>
        </>
    );
}

export default ParamTuning;