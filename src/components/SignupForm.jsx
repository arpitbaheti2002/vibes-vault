import React, { useState } from 'react';
import axios from 'axios';

function SignupForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageBackground, changeMessageBackground] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (firstName && lastName && email.includes('@') && password) {
      const obj = { firstName, lastName, email, password };
      const url = "https://vibesvault-backend.vercel.app/users/create-user";
  
      // Check if the email already exists
      axios.get(`https://vibesvault-backend.vercel.app/users/check-email?email=${email}`)
        .then((response) => {
          if (response.data.exists) {
            setMessage('Email already exists. Please use a different email.');
            changeMessageBackground('red');
          } else {
            // If email doesn't exist, create the user
            axios.post(url, obj)
              .then((res) => {
                if (res.status === 200) {
                  setMessage('User created successfully.');
                  changeMessageBackground('green');
                  setFirstName('');
                  setLastName('');
                  setEmail('');
                  setPassword('');
                } else {
                  setMessage('There was an error creating the user.');
                  changeMessageBackground('red');
                }
              })
              .catch((err) => {
                alert(err); // Handle error according to your application's needs
              });
          }
        })
        .catch((err) => {
          alert(err); // Handle error according to your application's needs
        });
    } else {
      setMessage('Please fill out all fields correctly.');
      changeMessageBackground('red');
    }
  };
  
  

  return (
    <div className='front-page-form Signup'>
      <div className='message' style={{backgroundColor: messageBackground}}>{message}</div>
      <div class="container">
        <div class="row align-items-start">
          <div class="col p-0">
            <label for="FirstName">first name</label><br />
            <input type="text" id="firstname" value={firstName} onChange={(e)=>setFirstName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
          </div>
          <div class="col p-0">
            <label for="LastName">last name</label><br />
            <input type="text" id="lastname" value={lastName} onChange={(e)=>setLastName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
          </div>
        </div>
      </div>
      <label for="email">email address</label><br />
      <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
      <label for="password">password</label><br />
      <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br /><br />
      <div className='text-center'>
        <button className="front-page-button front-page-button-main" onClick={handleSubmit}>Sign up</button><br />
        <button className="front-page-button front-page-button-auxiliary" onClick={props.onLogin}>Log in</button>
        <button className="front-page-button front-page-button-auxiliary" onClick={props.onReturn}>Return</button>
      </div>
    </div>
  )
}

export default SignupForm;
