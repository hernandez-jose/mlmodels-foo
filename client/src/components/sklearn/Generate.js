import React, {useState, useEffect} from 'react';

const Generate = () => {

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
        <div className='mb-5 mt-2'>
            <button className='btn btn-success'>Download code</button>
            <button className='btn btn-success mx-2'>Download Dockerfile</button>
        </div>
        </>
    );
}

export default Generate;