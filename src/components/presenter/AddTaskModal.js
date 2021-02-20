import React, {useState} from 'react';
import AddRangePicker from '../core/RangePicker';
import { Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core';
import '../css/modal.css';

const Modal = ({ onClose }) => {
  const [item, setItem] = useState('');
  const [formItems, setFormItems] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const buttonClose = (e) => {
    let convertStartDate = getDate(startDate);
    let convertendDate = getDate(endDate);
    onClose(convertStartDate, convertendDate, formItems);
  }

  const handleChange = (e) => {
    setItem(e.target.value);
    setDisableButton(true);
  }

  const checkValidation = (formData) => {
    let values = Object.values(formData);
    if((values.length === item) && getDate(startDate) && getDate(endDate)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  const handleTextBox = (e) => {
    let {value, id} = e.target;
    let trimmedValue = value && value.trim();
    if(trimmedValue) {
      let newForm = Object.assign(formItems, {[id]: trimmedValue});
      setFormItems(newForm);
      checkValidation(newForm);
    }
  }
  
  const getDate = (date) => {
    if(date) {
      let day = date.date();
      let month = date.month() + 1;
      let year = date.year();
      return `${year}-${month}-${day}`;
    }
  }

  const onDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const everyItem = () => {
    let result = []
    for(let i=1; i <= item; i++) {
      result.push(<div className="item"><TextField id={i} label={`Habit ${i}`} variant="outlined" onChange={handleTextBox} className="text-form" /></div>);
    }
    return result;
  }
  const displayItem = () => {
    if(item) {
      return (
        <form noValidate={true} autoComplete="off" className="form">
          {everyItem()}
        </form>
      )
    } 
  }

  return (
    <div className="modal-paper">
      <h4 id="simple-modal-title">Add Habit</h4>
      <div className="wrapper"> 
        <div>
          <AddRangePicker 
            onDateChange={onDateChange} 
            startDate={startDate}
            endDate={endDate}
            />
        </div>
        <div className="form-wrapper">
          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">Number of Habits</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item}
              onChange={handleChange}
            >
            {
              [1,2,3,4,5].map((val, index) => {
                return (
                  <MenuItem key={index} value={val}>{val}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </div>
        {displayItem()}
      </div>
      <footer className="footer">
        <Button variant="contained" color="primary" size="medium" disabled={disableButton} onClick={buttonClose}>
          Track
        </Button>
      </footer>
    </div>
  );
};
export default Modal;
