import React, { useState } from 'react';

export default function AddressSelector (props) {
  const [state, setState] = useState('');
  const [cities, setCities] = useState([]);

  const statesWithCities = {
    NSW: ['Sydney', 'Newcastle', 'Wollongong'],
    VIC: ['Melbourne', 'Geelong', 'Ballarat'],
    QLD: ['Brisbane', 'Gold Coast', 'Sunshine Coast'],
    SA: ['Adelaide', 'Victor Harbor']
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setCities(statesWithCities[selectedState] || []);
  };

  const formStyle = {
    marginRight: '40px',
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div>
      <select value={state} onChange={handleStateChange} style={formStyle}>
        <option value="" disabled>States</option>
        {Object.keys(statesWithCities).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select disabled={!state} className={formStyle} style={{ ...formStyle, width: '120px' }}>
        <option value="" disabled>Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <input type="text" placeholder="Street" className={formStyle} style={{ ...formStyle, width: '180px', marginRight: '0' }}/>
    </div>
  );
}
