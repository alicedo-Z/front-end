import React, { useState } from 'react';
import { Input } from 'antd';
import AddressSelector from '../Selector/AddressSelector';
import BedSelector from '../Selector/BedSelector';
import Amenities from './Amenities';
import DateSelector from '../Selector/DateSelector';
import UploadImage from './UploadImage';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

// Styles for the component
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subHeading: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    border: '2px solid rgba(0, 0, 0, 0.02)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  formInput: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
  },
  submitButton: {
    marginTop: '50px',
    ':hover': {
      backgroundColor: '#0044cc',
    },
  },
  fileInput: {
    display: 'none',
  },
};

export default function CreateHouse () {
  // State variables for the form inputs
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [address] = useState('');
  const [price] = useState('');
  const [thumbnail] = useState('');

  // Function to handle form submission
  const submitNewHouse = async (e) => {
    e.preventDefault();
    // Validation for form fields
    if (!title || !address || !price || !thumbnail) {
      setError('Please complete all listing fields');
      setShowError(true);
      return;
    }
    // Metadata object (currently empty)
    const medadata = {};

    try {
      // Submitting new listing to the server
      const url = 'http://localhost:5005/listings/new';
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError('You must be logged in to submit a listing');
        setShowError(true);
        return;
      }
      // Request structure for POST request
      const requestStructure = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Using the correct format for token
        },
        body: JSON.stringify({
          title,
          address,
          price,
          thumbnail,
          medadata,
        }),
      };
      const response = await fetch(url, requestStructure);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle successful response
      } else {
        setError('An error occurred while trying to submit the listing');
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError('A network error occurred. Please try again later.');
      setShowError(true);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.heading}>Create New Listing</h2>
        <form style={styles.form} onSubmit={submitNewHouse}>
          <UploadImage />
          <input style={styles.formInput} type="text" placeholder="Listing Title" value={title} onChange={e => setTitle(e.target.value)} />
          {/* ... other form fields ... */}
          <h3 style={styles.subHeading}>Address</h3>
          <AddressSelector style={styles.formInput} />
          <h3 style={styles.subHeading}>Cost</h3>
          <Input style={styles.formInput} prefix="$" suffix="per night" />
          <h3 style={styles.subHeading}>Bedding</h3>
          <BedSelector />
          <h3 style={styles.subHeading}>Amenities</h3>
          <Amenities />
          <DateSelector />
          <button style={{ ...styles.button, ...styles.submitButton }} type="submit">Submit Listing</button>
        </form>
        <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      </div>
    </>
  );
}
