import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const styles = {
  login: {
    backgroundImage: 'url(\'../../assert/log_bg.jpeg\')', // 确保这是正确的路径
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerModal: {
    background: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  formInput: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: 'calc(100% - 22px)',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginBottom: '20px',
    cursor: 'pointer',
    width: '100%',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF',
    borderRadius: '4px',
    width: '100%',
    cursor: 'pointer',
    ':hover': {
      color: '#0056b3',
      borderColor: '#0056b3',
    },
  },
};

export default function Login () {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const SignUp = async () => {
    if (!name || !email || !password || !confirm) {
      setError('Please complete all fields');
      setShowError(true);
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      setShowError(true);
      return;
    }

    try {
      const url = 'http://localhost:5005/user/auth/register';
      const requestStructure = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      };
      const response = await fetch(url, requestStructure);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('email', email);
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        setError('An error occurred while trying to register');
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError('A network error occurred. Please try again later.');
      setShowError(true);
    }
  };

  const ToLoginPage = () => {
    navigate('/login');
  }

  return (
    <div style={styles.login}>
      <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      <div style={styles.registerModal}>
        <h2>Register</h2>
        <input type='text' style={styles.formInput} placeholder='User name' value={name} onChange={e => setName(e.target.value)}/>
        <input type='email' style={styles.formInput} placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type='password' style={styles.formInput} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        <input type='password' style={styles.formInput} placeholder='Confirm Password' value={confirm} onChange={e => setConfirm(e.target.value)} />
        <button style={styles.submitButton} onClick={SignUp}>SUBMIT</button>
        <button style={styles.backButton} onClick={ToLoginPage}>BACK TO LOGIN</button>
      </div>
    </div>
  );
}
