import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageBackground, changeMessageBackground] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.includes('@') && password) {
      axios
        .get(`https://vibesvault-backend.vercel.app/users/login?email=${email}&password=${password}`)
        .then((response) => {
          if (response.data.exists) {
            if (response.data.match) {
              setMessage('Login successful');
              changeMessageBackground('green');
              localStorage.setItem('user', JSON.stringify(response.data.user));
              navigate('/dashboard');
            } else {
              setMessage('Incorrect Password');
              changeMessageBackground('red');
            }
          } else {
            setMessage('No user found.');
            changeMessageBackground('red');
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setMessage('Please fill out all fields correctly.');
      changeMessageBackground('red');
    }
  };

  return (
    <div className="front-page-form login">
      <div className="message" style={{ backgroundColor: messageBackground }}>
        {message}
      </div>
      <label htmlFor="email">Email address</label>
      <br />
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <div className="text-center">
        <button
          className="front-page-button front-page-button-main"
          onClick={handleSubmit}
        >
          Log in
        </button>
        <br />
        <button
          className="front-page-button front-page-button-auxiliary"
          onClick={props.onSignup}
        >
          Sign up
        </button>
        <button
          className="front-page-button front-page-button-auxiliary"
          onClick={props.onReturn}
        >
          Return
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
