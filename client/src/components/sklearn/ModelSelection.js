import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import models from './data/Models';

const ModelSelection = ( {FieldUpdateAmount, setFieldUpdateAmount} ) => {

    // const [FieldUpdateAmount, setFieldUpdateAmount] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const [ModalData, setModalData] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(index, data){
        index = index.split("__")[1]
        let temp = {
            ...data,
            index: index
        }
        setModalData(temp)
        console.log(temp)
        setShow(true);
    }
    const [ModelNameData, setModelNameData] = useState(() => {
  
        const defaultValues = []
    
        // getting stored value
        const saved = localStorage.getItem("ModelNameData");
        console.log(saved)
        if(saved == null){
          return defaultValues
        }else{
          console.log(saved)
          if(saved == 'undefined'){
            console.log('unde')
            return defaultValues
          }else{
            console.log('full var', saved)
            return JSON.parse(saved) 
          }
        //   return models
        }
    });

    const [ModelSelection, setModelSelection] = useState(() => {
  
        const defaultValues = {'none': ''}
    
        // getting stored value
        const saved = localStorage.getItem("ModelSelection");
        if(saved == null){
          return defaultValues
        }else{
          return JSON.parse(saved)
        //   return models
        }
    });

    function handleOnChangeField(value, field_name, model_name, index){
        index = index.split("__")[1]
        // update_field(value, field_name, index)
        // update_field(model_name, 'model_name', index)

        let temp = {
            ...ModelSelection
        }
        temp[index] = {
            model_name: model_name, 
            [field_name]: value
        }

        console.log(temp)
        setModelSelection(temp)
        setFieldUpdateAmount(FieldUpdateAmount + 1)
    }

    function handleOnChangeText(value, field_name, index){
        index = index.split("__")[1]
        console.log(index)
        let temp = ModelSelection
        temp[index] = {...ModelSelection[index], [field_name]: value}
        console.log(temp)
        setModelSelection(temp)
        setFieldUpdateAmount(FieldUpdateAmount + 1)
    }

    function is_checked(field_name, index){
        // typeof ModelSelection[count] === 'undefined'
        if(typeof ModelSelection[index] !== 'undefined'){
            if(typeof ModelSelection[index][field_name] !== 'undefined'){
                return ModelSelection[index][field_name] == true
            }else{
                return false
            }
        }
        return false
    }

    function get_value(field_name, index){
        // typeof ModelSelection[count] === 'undefined'
        if(typeof ModelSelection[index] !== 'undefined'){
            if(typeof ModelSelection[index][field_name] !== 'undefined'){
                return ModelSelection[index][field_name]
            }else{
                return ""
            }
        }
        return ""
    }
    
    function field_exist(field_name, index){
        // typeof ModelSelection[count] === 'undefined'
        if(typeof ModelSelection[index] !== 'undefined'){
            if(typeof ModelSelection[index][field_name] !== 'undefined'){
                return true
            }else{
                return false
            }
        }
        return false
    }

    useEffect(() => {
        // code to run after render goes here s3Option
        console.log(refresh)
        localStorage.setItem("ModelSelection", JSON.stringify(ModelSelection));
        if( localStorage.getItem("field_model_type") != null ){
            let clf = localStorage.getItem("field_model_type")
            localStorage.setItem("ModelNameData", JSON.stringify(models[ JSON.parse(clf) ]) );
            setModelNameData( models[ JSON.parse(clf) ] )
        }
        console.log('ModelSelection useEffect')
        // training_data_location_url
    }, [ModelSelection, FieldUpdateAmount, ModelNameData, ModalData] );

    function PopulateModels(){
        // console.log(localStorage.getItem("ModelNameData"))
        // setModelNameData(JSON.parse(localStorage.getItem("ModelNameData")))
        // console.log(ModelNameData) 

        let loop = ModelNameData
        if(loop == 'undefined'){
            loop = []
        }
        let table_rows
        let count = -1
        table_rows = loop?.map(data => {
            count++
            return (
                <tr key={count}>
                    <td><input onChange={e => handleOnChangeField(e.target.checked, 'is_selected', data.model_name, e.target.id)} name={'is_selected_' + count} id={'is_selected__' + count} className="form-check-input" type="checkbox" checked={is_checked('is_selected', count)} /></td>
                    <td>{data.model_name}</td>
                    <td>{data.model_type}</td>
                    <td>
                        <button onClick={ e => handleShow(e.target.id, data)} id={'hparams__' + count} disabled={!is_checked('is_selected', count)} className='btn btn-primary btn-sm'>Override params</button>
                    </td>
                </tr>
            );
        })
        return table_rows
    }

    return (
        <>
        <h4 className='mt-3'>Model selection</h4>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ModalData?.model_name} hyperparameters override</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='alert alert-info'>
                    Go to the sklearn documentation to lookup hyperparameter name and values.
                </div>
                <label htmlFor="param_override" className="form-label">JSON key values of hyperparameters</label>
                <textarea placeholder="{'C': 0.001, 'tol': 'sparse_cg'}" className="form-control" value={get_value('param_override', ModalData?.index)} onChange={e => handleOnChangeText(e.target.value, 'param_override', e.target.id)} id={"param_override__" + ModalData?.index} rows="3"></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Select model</th>
                    <th>Algorithm</th>
                    <th>Model type</th>
                    <th>Hyperparameters</th>
                </tr>
            </thead>
            <tbody>
                <PopulateModels />
            </tbody>
        </table>
        </>
    );
}

export default ModelSelection;