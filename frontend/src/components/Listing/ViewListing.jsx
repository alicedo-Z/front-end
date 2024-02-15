import React, { useState, useEffect } from 'react';
import ListBox from './ListBox';

const styles = {
  listBox: {
    color: 'black',
    marginTop: '24px',
  },
  listBoxItem: {
    maxHeight: '380px',
  },
  listBoxItemImage: {
    height: '300px',
  }
};

export default function ViewListing () {
  const [listings, setListings] = useState([]);
  const [isLoggedIn] = useState(false); // 或者您可以使用更复杂的登录状态检查

  const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5005/listings');
      const data = await response.json();
      // mock
      const mockArr = Array.from({ length: 20 }).map((d, idx) => ({
        ...data.listings[0],
        id: data.listings[0].id + idx,
        totalReviews: '这里是描述'
      }))
      console.log(mockArr);
      return mockArr;
    } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchListings().then(data => {
      // 如果用户登录了，首先显示状态为'accepted'或'pending'的房源
      if (isLoggedIn) {
        data.sort((a, b) => {
          if ((a.status === 'accepted' || a.status === 'pending') && (b.status !== 'accepted' && b.status !== 'pending')) {
            return -1;
          }
          if ((b.status === 'accepted' || b.status === 'pending') && (a.status !== 'accepted' && a.status !== 'pending')) {
            return 1;
          }
          return a.title.localeCompare(b.title);
        });
      } else {
        data.sort((a, b) => a.title.localeCompare(b.title));
      }
      setListings(data);
    });
  }, [isLoggedIn]); // 依赖项数组包含isLoggedIn，以便在登录状态改变时更新

  return (
    <div>
      <ListBox dataList={listings} />
      {listings.map((listing) => (
        <div key={listing.id} style={styles.listBox}>
          <h3>{listing.title}</h3>
          <div style={styles.listBoxItem}>
            <img src={listing.thumbnail} alt="Thumbnail" style={styles.listBoxItemImage} />
            <p>Total Reviews: {listing.totalReviews}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
