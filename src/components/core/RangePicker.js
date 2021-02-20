import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function RangePicker({onDateChange, startDate, endDate}) {
  const [focusedInput, setFocusedInput] = useState('');
  return (
    <React.Fragment>
      <DateRangePicker
        startDate={startDate}
        startDateId='your_unique_start_date_id'
        endDate={endDate}
        endDateId='your_unique_end_date_id'
        onDatesChange={({startDate, endDate}) => {
          onDateChange(startDate, endDate)
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        />
    </React.Fragment>
  )
}
