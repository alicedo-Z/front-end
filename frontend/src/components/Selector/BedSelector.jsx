import React, { useState } from 'react';
import { Select, Input } from 'antd';

const BedSelector = () => {
  const [numOfRoom, setNumOfRoom] = useState('1');
  const [bedInRoom, setBedInRoom] = useState([]);

  const bedStyle = {
    margin: '20px 0'
  }

  const roomChange = (value) => {
    setNumOfRoom(value);
    setBedInRoom(Array(parseInt(value)).fill(1))
    console.log(bedInRoom);
  };

  const BedChange = (value, index) => {
    const newBedsInRooms = [...bedInRoom];
    newBedsInRooms[index] = value;
    setBedInRoom(newBedsInRooms);
  };

  return (
  <div>
    <Select style={{ width: '100%' }}
      showSearch
      optionFilterProp="children"
      defaultValue="1"
      onChange={roomChange}
      options={[
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
      ]}
    />
    {Array.from({ length: numOfRoom }, (_, index) => (
      <div key={index} style = {bedStyle}>
        <label style={{ marginRight: '10px' }}>{`Beds in room ${index + 1}`}</label>
        <Select
        defaultValue="1"
        onChange={BedChange}
        options={[
          { value: '1' },
          { value: '2' },
          { value: '3' },
          { value: '4' },
        ]}
        />
      </div>
    ))}
    <h4>Number of Bathroom</h4>
    <Input placeholder="Number of Bathroom" />
  </div>
  )
};
export default BedSelector;
