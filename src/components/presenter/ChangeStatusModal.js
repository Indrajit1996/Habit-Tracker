import React, {useState} from 'react';
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import '../css/modal.css';

function ChangeStatusModal({data, handleSubmit}) {
  const [item, setItem] = useState('');
  const handleChange = (e) => {
    setItem(e.target.value);
  }
  const handleButtonClick = () => {
    handleSubmit(item);
  }
  return (
    <div className="modal-change-status">
      <h4 id="simple-modal-title">Change Status</h4>
      <div className="modal-wrapper">
        <FormControl className="form-control">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item}
              onChange={handleChange}
            >
            {
              data.map((val) => {
                return (
                  <MenuItem value={val}>{val}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
      <footer className="footer">
        <Button variant="contained" color="primary" size="small" onClick={handleButtonClick}>
          Change
        </Button>
      </footer>
    </div>
  )
}

export default ChangeStatusModal;
