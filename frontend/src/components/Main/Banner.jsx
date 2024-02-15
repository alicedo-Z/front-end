import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { HomeOutlined, UserDeleteOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import backgroundImage from '../../assert/landing_bg.webp';
import SearchWrap from './SearchWrap';

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
};

export default function Landing () {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)
  const isMountedRef = useRef(true);
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const ToMainPage = () => {
    navigate('/main')
  }

  const ToHostListing = () => {
    navigate('/hostlisting')
  }

  const handleSearch = () => {
    setShowSearch(true);
  }

  const LogOut = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5005/user/auth/logout';
        const requestStructure = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, requestStructure);

        if (isMountedRef.current) {
          if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/');
          } else {
            setError('Can not log out!');
            setShowError(true);
          }
        }
      } catch (error) {
        console.error('Logout error:', error);
        if (isMountedRef.current) {
          setError('A network error occurred. Please try again later.');
          setShowError(true);
        }
      }
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <Link to="/host">
          create new hosted house
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/mylisting">
          My Hosted Listings
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/main">
          Delite Listings
        </Link>
      ),
    },
  ];

  return (
    <div style={styles.landingContainer}>
      {/* 添加 ErrorPopup 组件 */}
      <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      {/* 搜索区 */}
      {showSearch && (<SearchWrap setShowSearch={setShowSearch} />)}
      <Space style={styles.header}>
        <div style={styles.logo} onClick={ToMainPage}>
          <HomeOutlined />
          <span>airbnb</span>
        </div>
        <div style={styles.menu} onClick={ToHostListing}>
          <span>ALL LISTINGS</span>
        </div>
        <div style={styles.actions}>
        <Space>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MenuOutlined style={{ marginRight: '20px', color: 'white' }} />
              </Space>
            </a>
          </Dropdown>
          <UserDeleteOutlined onClick={LogOut} />
          <SearchOutlined onClick={handleSearch} />
          </Space>
        </div>
      </Space>
      <div style={styles.backgroundContainer}>
        <Space>
          <div style={styles.overlayText}>Welcome to Your Dashboard</div>
        </Space>
      </div>
    </div>
  );
}
