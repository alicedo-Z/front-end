import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const styles = {
  login: {
    backgroundImage: 'url(\'../../assert/log_bg.jpeg\')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerModal: {
    background: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  formInput: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: 'calc(100% - 22px)'
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    width: '100%',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none'
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF'
  },
  homeButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none'
  }
};

export default function Login () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const handleLogin = async () => {
    if (email && password) {
      try {
        const url = 'http://localhost:5005/user/auth/login';
        const requestStructure = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        };
        const response = await fetch(url, requestStructure);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('email', email);
          localStorage.setItem('token', data.token);
          navigate('/main');
        } else {
          setError('Password or email is incorrect');
          setShowError(true);
        }
      } catch (error) {
        setError('An error occurred while trying to log in');
        setShowError(true);
      }
    } else {
      setError('Please enter both email and password');
      setShowError(true);
    }
  };

  const ToSignupPage = () => {
    navigate('/signup');
  }
  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div style={styles.login}>
      <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      <div style={styles.registerModal}>
        <h2>Login</h2>
        <input type='email' style={styles.formInput} placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type='password' style={styles.formInput} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button style={{ ...styles.button, ...styles.submitButton }} onClick={handleLogin}>Log in</button>
        <button style={{ ...styles.button, ...styles.backButton }} onClick={ToSignupPage}>Sign Up</button>
        <button style={{ ...styles.button, ...styles.homeButton }} onClick={handleGoHome}>Back HomePage</button>
      </div>
    </div>
  )
}
