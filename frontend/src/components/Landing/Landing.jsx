import React, { useState } from 'react'
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import backgroundImage from '../../assert/landing_bg.webp';
import ViewListing from '../Listing/ViewListing';
import SearchWrap from '../Main/SearchWrap';

const styles = {
  landingContainer: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
  },

  backgroundContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '2rem',
    textShadow: '2px 2px 4px #000000',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#008489',
    color: 'white',
    padding: '10px 20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    cursor: 'pointer',
  },
  menu: {
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '24px',
    cursor: 'pointer',
  },
  ViewListingSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc(33vh - 50px)',
  },
};

export default function Landing () {
  const navigate = useNavigate();
  const [showListings, setShowListings] = useState(false);
  const [showSearch, setShowSearch] = useState(false)

  const ToLoginPage = () => {
    navigate('/login');
  }

  const toListingsScreen = () => {
    setShowListings(prevState => !prevState);
  }
  const handleSearch = () => {
    setShowSearch(true);
  }

  return (
    <div style={styles.landingContainer}>
        <Space style={styles.header}>
        <div style={styles.logo}>
            <HomeOutlined />
            <span>airbnb</span>
        </div>
        <div style={styles.menu} onClick={toListingsScreen}>
            <span>ALL LISTINGS</span>
        </div>
        <div style={styles.actions}>
            <MenuOutlined style={{ marginRight: '20px' }}/>
            <UserOutlined onClick={ToLoginPage} style={{ marginRight: '20px' }} />
            <SearchOutlined onClick={handleSearch} />
        </div>
        </Space>
       {!showListings && (
         <div style={styles.backgroundContainer}>
         <Space>
           <div style={styles.overlayText}>
             Plan your next trip with us!
           </div>
         </Space>
       </div>
       )}
      {showListings && <ViewListing />}
       {/* 搜索区 */}
       {showSearch && (<SearchWrap setShowSearch={setShowSearch} />)}
    </div>
  );
}
