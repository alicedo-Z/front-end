import React, { useState, useEffect } from 'react';
import ListBox from '../Listing/ListBox'

export default function Hosted () {
  const [listings, setListings] = useState([]);
  const getUserEmail = () => {
    return localStorage.getItem('email');
  }
  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5005/listings');
      const data = await response.json();
      return data.listings;
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  };
  useEffect(() => {
    fetchListings().then(res => {
      const ownerEmail = getUserEmail();
      if (res && Array.isArray(res)) {
        const filteredListings = res.filter(item => item.owner === ownerEmail);
        setListings(filteredListings);
      }
    })
  }, []);

  // useEffect(() => {
  //   fetchListings().then(res => {
  //     const ownerEmail = getUserEmail();
  //     const listings = res.listing.filter(item => item.owner === ownerEmail);
  //     setListings(listings);
  //   })
  // }, []);

  return (
    <div>
      <ListBox dataList={listings} />
      {false && (listings.map((listing) => (
        <div key={listing.id} className='listBox'>
          <h3>{listing.title}</h3>
          <img src={listing.thumbnail} alt="Thumbnail" />
          <p>Total Reviews: {listing.totalReviews}</p>
        </div>
      )))}
    </div>
  );
}
