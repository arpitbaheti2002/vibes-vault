import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async () => {
    if (newPassword !== '' && newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://vibesvault-backend.vercel.app/users/update-password', {
        userId: user._id,
        newPassword: newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating password:', error.response.data.error);
      setMessage('Error updating password. Please try again.');
    }

    // Clear form fields after update
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action is irreversible.');

    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await axios.delete(`https://vibesvault-backend.vercel.app/users/delete-user/${user._id}`);
      localStorage.removeItem('user');
      navigate('/');
      
      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting profile:', error.response.data.error);
      setMessage('Error deleting profile. Please try again.');
    }
  };
  
  

  // Check if user is available
  if (!user) {
    return <div>Loading...</div>;
  }

  // Extract user details
  const { firstName, lastName, email } = user;

  return (
    <div className="library-container">
      <div className=" row m-0 p-0">
        <div className=" col-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="profile-container col-10 m-0 p-0">
          <h1>Welcome, {firstName} {lastName}!</h1>
          <p>Email: {email}</p>

          {/* Update Password Form */}
          <form>
            <label htmlFor="newPassword">New Password: </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <br />

            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <br />
            <button type="button" className='front-page-button front-page-button-main' onClick={handleUpdatePassword}>
              Update Password
            </button>
          </form>

          {/* Delete Profile Button */}
          <button type="button" className='button2 front-page-button front-page-button-main'onClick={handleDeleteProfile}>
            Delete Profile
          </button>

          {/* Display message */}
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
