import React, { useState, useEffect } from 'react';

export default function PublishList () {
  const [listings, setListings] = useState([]);

  const getUserEmail = () => {
    return localStorage.getItem('email');
  };

  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5005/listings/publish');
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
        const ownerListings = res.filter(item => item.owner === ownerEmail);
        setListings(ownerListings);
      }
    });
  }, []);

  // Mock function to toggle publish status
  const togglePublish = (id) => {
    setListings(listings.map(listing => {
      if (listing.id === id) {
        // In a real application, you would send a request to your backend here
        return { ...listing, isPublished: !listing.isPublished };
      }
      return listing;
    }));
  };

  return (
    <div>
      <h1>My Listings</h1>
      {listings.map((listing) => (
        <div key={listing.id} className='listBox'>
          <h3>{listing.title}</h3>
          <p>Status: {listing.isPublished ? 'Published' : 'Unpublished'}</p>
          <button onClick={() => togglePublish(listing.id)}>
            {listing.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <p>Total Reviews: {listing.totalReviews}</p>
        </div>
      ))}
    </div>
  );
}
