import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DataPreprocessing = () => {

    const [ModalData, setModalData] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(index, data){
        index = index.split("__")[1]
        // let index = data.index
        let temp = {
            ...data,
            index: index
        }
        setModalData(temp)
        console.log(temp)
        setShow(true);
    }

    const [DataUpdate, setDataUpdate] = useState(0)
    const [FieldUpdateAmount, setFieldUpdateAmount] = useState(0)
    const [DataPreproce, setDataPreproce] = useState(() => {
  
        const defaultValues = [
            {
                'index': 0,
                'column_name': '',
                'data_type': '',
                'preprocessor': '',
                'is_target_field': false
            }
        ]
    
        // getting stored value
        const saved = localStorage.getItem("DataPreproce");
        if(saved == null){
          return defaultValues
        }else{
          return JSON.parse(saved)
        }
    });

    useEffect(() => {
        // code to run after render goes here s3Option
        localStorage.setItem("DataPreproce", JSON.stringify(DataPreproce));
        console.log('DataPreprocessing useEffect')
        // training_data_location_url
    }, [DataPreproce, DataUpdate, FieldUpdateAmount, ModalData]);

    function handelOnAddRow(){
        let row = {
            'index': DataPreproce.length,
            'column_name': '',
            'data_type': '',
            'preprocessor': '',
            'is_target_field': ''
        }
        let temp = DataPreproce
        temp.push(row)
        setDataPreproce(temp)
        let count = DataUpdate + 1
        console.log(count)
        setDataUpdate(count)
    }

    function handelOnDeleteRow(){
        let temp = DataPreproce
        temp.pop()
        let count = DataUpdate - 1
        setDataPreproce(temp)
        setDataUpdate(count)
    }

    function handleOnChangeField(value, field_name, index){
        let temp = DataPreproce
        temp[index][field_name] = value
        setDataPreproce(temp)
        setFieldUpdateAmount(FieldUpdateAmount + 1)
    }

    function handleOnChangeText(value, field_name, index){
        let temp = DataPreproce
        temp[index][field_name] = value
        setModalData(temp[index])
        setDataPreproce(temp)
        setFieldUpdateAmount(FieldUpdateAmount + 1)
    }

    function PopulateRows(){
        let table_rows = DataPreproce.map(data => {
            return (
                <tr key={data.index}>
                    <td><input placeholder="col" onBlur={e => handleOnChangeField(e.target.value, 'column_name', data.index)} name={'column_name_' + data.index} id={'column_name_' + data.index} type="text" defaultValue={data.column_name} className="form-control form-control-xs" /></td>
                    <td>
                        <select onChange={e => handleOnChangeField(e.target.value, 'data_type', data.index)} name={'data_type_' + data.index} id={'data_type_' + data.index} className="form-control xs" defaultValue={data.data_type}>
                            <option value="string">String</option>
                            <option value="bool">boolean (true or false)</option>
                            <option value="int">Integer</option>
                            <option value="float">Float (decimal 0.00)</option>
                            <option value="datetime64">Datetime</option>
                            <option value="category">Category</option>
                        </select>
                    </td>
                    <td>
                        <select onChange={e => handleOnChangeField(e.target.value, 'preprocessor', data.index)} name={'preprocessor_' + data.index} id={'preprocessor_' + data.index} className="form-control xs" defaultValue={data.preprocessor}>
                            <option value="StandardScaler">StandardScaler</option>
                            <option value="MinMaxScaler">MinMaxScaler</option>
                            <option value="KBinsDiscretizer">KBinsDiscretizer</option>
                            <option value="TargetEncoder">TargetEncoder</option>
                        </select>
                        <div className='col text-center'>
                            <button onClick={(e) => handleShow(e.target.id, data)} id={'dpre__' + data.index} className='btn btn-primary btn-sm'>Change defaults</button>
                        </div>
                    </td>
                    <td><input onChange={e => handleOnChangeField(e.target.checked, 'is_target_field', data.index)} name={'is_target_field_' + data.index} id={'is_target_field_' + data.index} className="form-check-input" type="checkbox" checked={data.is_target_field == true} /></td>
                </tr>
            );
        })
        return table_rows
    }

    return (
        <>
        <h4 className='mt-3'>Data preprocessing</h4>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Preprocessor parameters override</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='alert alert-info'>
                    Go to the sklearn API documentation to lookup preprocessor parameters names and values.
                </div>
                <label htmlFor="pre_processor_params" className="form-label">JSON key values of preprocessor parameters</label>
                <textarea placeholder="{'C': 0.001, 'tol': 'sparse_cg'}" className="form-control" value={ModalData?.pre_processor_params} onChange={e => handleOnChangeText(e.target.value, 'pre_processor_params', ModalData?.index)} id={"pre_processor_params__" + ModalData?.index} rows="3"></textarea>
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
                    <th>Column name</th>
                    <th>Data type</th>
                    <th>Preprocessor</th>
                    <th>Is target field</th>
                </tr>
            </thead>
            <tbody>
                <PopulateRows />
            </tbody>
        </table>
        <button onClick={handelOnAddRow} className='btn btn-success btn-sm'>Add field</button>&nbsp;&nbsp;
        <button onClick={handelOnDeleteRow} disabled={DataPreproce.length == 1} className='btn btn-danger btn-sm'>Delete field</button>
        </>
    );
}

export default DataPreprocessing;