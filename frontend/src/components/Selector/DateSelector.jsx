import React from 'react'
import { DatePicker } from 'antd';

export default function DateSelector () {
  const { RangePicker } = DatePicker;
  return (
    <div>
        <h3>Select Date</h3>
        <RangePicker style={{ width: '100%' }}/>
    </div>
  )
}
