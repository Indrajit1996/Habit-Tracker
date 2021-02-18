import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

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
  }
}));

function ChangeStatusModal({data, handleSubmit}) {
  const classes = useStyles();
  const [item, setItem] = useState('');
  const handleChange = (e) => {
    setItem(e.target.value);
  }
  const handleButtonClick = () => {
    handleSubmit(item);
  }
  return (
    <div className={classes.paper} style={{position: 'absolute',top: '20%', left: '30%', height: '250px', width: '500px'}}>
      <h4 id="simple-modal-title">Change Status</h4>
      <div style={{marginTop: '48px'}}>
        <FormControl className={classes.formControl}>
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
      <footer style={{position: 'absolute', bottom: '0', right: '0', marginRight: '16px', marginBottom: '16px'}} onClick={handleButtonClick}>
        <Button variant="contained" color="primary" size="small">
          Change
        </Button>
      </footer>
    </div>
  )
}

export default ChangeStatusModal;
