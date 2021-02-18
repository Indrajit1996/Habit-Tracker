import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class AddRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null, 
      endDate: null,
    }
  }
  componentWillMount() {
    this.setState({
      startDate: null, 
      endDate: null,
    })
  }
  render() {
    const {onDateChange} = this.props;
    return (
      <React.Fragment>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId='your_unique_start_date_id'
          endDate={this.state.endDate}
          endDateId='your_unique_end_date_id'
          onDatesChange={({startDate, endDate}) => {
            this.setState({ startDate, endDate })
            onDateChange(startDate, endDate)
          }}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput})}
         />
      </React.Fragment>
    );
  }
}
