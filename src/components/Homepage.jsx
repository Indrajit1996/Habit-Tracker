import React, { Component } from 'react';
import ModalDialog from './AddTaskModal';
import { connect } from 'react-redux';
import taskActions from '../store/actions/taskActions';
import {Modal, Button} from '@material-ui/core';
import DisplayTable from './DisplayTable';
import ProgressReport from './ProgressReport';
import habitSelector from './selectors/habitSelector';
import { v4 as uuidv4 } from 'uuid';
import './css/homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  handleOpen = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };
  handleSubmit = (startDate, endDate, items) => {
    let itemArray = Object.values(items);
    let result = itemArray.map((item) => {
      return {id: uuidv4(),startDate: startDate, endDate: endDate,  value: item, status: 'Incomplete'}
    });
    this.props.addHabit(result);
    this.handleClose();
  }
  updateStatus = (value ,row) => {
    this.props.updateRow(row);

    this.notifyUser();
  }
  notifyUser = () => {
    let element = document.createElement('div');
    element.setAttribute('id', 'notify');
    element.classList.add('notification');
    element.innerHTML = 'Task Completed, Great Job!';

    document.getElementById("root").appendChild(element);
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      document.getElementById('notify').remove();
    }, 3000);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if((nextProps.tasks.collection.length === 0) && (nextProps.tasks.progress.length > 0)) {
      this.props.clearState();
    }
  }
  

  render() {
    let { tasks: {collection = [], progress = []} } = this.props;
    console.log(this.props);
    console.log(collection);
    return (
      <div style={{margin: '120px'}}>
        <Button variant="contained" color="primary" onClick={this.handleOpen} size="large">
          Add Habit
        </Button>
        <Modal
          open={this.state.show}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ModalDialog onClose={this.handleSubmit} />
        </Modal>
        { collection.length ?
          <DisplayTable
            data={collection}
            updateStatus={this.updateStatus}
         /> : null
        }
        { collection.length || progress.length ?
          <ProgressReport
            total={collection}
            completed={progress}
          /> : null
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let result = habitSelector(state);
  return result;
};

const mapDispatchToProps = (dispatch) => (taskActions(dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);