import React, {useState} from 'react';
import AddRangePicker from './AddRangePicker';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core';
import './css/homepage.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    width: '50%',
    marginTop: 30,
  },
  textForm: {
    width: '100%'
  },
}));

const Modal = ({ onClose }) => {
  const classes = useStyles();
  const [item, setItem] = useState('');
  const [formItems, setFormItems] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const buttonClose = (e) => {
    onClose(startDate, endDate, formItems)
  }

  const handleChange = (e) => {
    setItem(e.target.value);
  }

  const handleTextBox = (e) => {
    let {value, id} = e.target;
    let newForm = Object.assign(formItems, {[id]: value})
    setFormItems(newForm);
  }
  const getDate = (date) => {
    if(date) {
      let day = date.date();
      let month = date.month() + 1;
      let year = date.year();
      return `${day}-${month}-${year}`;
    }
  }
  const onDateChange = (startDate, endDate) => {
    setStartDate(getDate(startDate));
    setEndDate(getDate(endDate));
  }



  const everyItem = () => {
    let result = []
    for(let i=1; i <= item; i++) {
      result.push(<div style={{marginTop: '20px'}}><TextField id={i} label={`Habit ${i}`} variant="outlined" onChange={handleTextBox} className={classes.textForm} /></div>);
    }
    return result;
  }
  const displayItem = () => {
    if(item) {
      return (
        <form noValidate={false} autoComplete="off" style={{marginTop: '20px'}}>
          {everyItem()}
        </form>
      )
    }
  }
  return (
    <div className={classes.paper} style={{position: 'absolute',top: '10%', left: '30%', height: '650px', width: '500px'}}>
      <h4 id="simple-modal-title">Add Habit</h4>
      <div style={{margin: '30px 0'}}> 
        <div><AddRangePicker onDateChange={onDateChange} /></div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Number of Habits</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item}
              onChange={handleChange}
            >
            {
              [1,2,3,4,5].map((val) => {
                return (
                  <MenuItem value={val}>{val}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </div>
        {displayItem()}
      </div>
      <footer style={{position: "absolute", bottom: 0, marginBottom: '20px', right: 0, marginRight: '20px'}}>
        <Button variant="contained" color="primary" size="medium" onClick={buttonClose}>
          Track
        </Button>
      </footer>
    </div>
  );
};
export default Modal;
