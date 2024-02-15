import React from 'react';
import { Select, Space } from 'antd';
const options = [
  {
    value: 'GYM',
  },
  {
    value: 'Swimming pool',
  },
  {
    value: 'Pet space',
  },
  {
    value: 'Playgrounds',
  },
];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const Amenities = () => (
  <Space
    style={{
      width: '100%',
    }}
    direction="vertical"
  >
    <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      onChange={handleChange}
      options={options}
    />
  </Space>
);
export default Amenities;
