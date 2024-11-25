import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Retrieve the token
    console.log(token);
    if (!token) {
      setError('No token found, please log in.');
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5000/api/profiledata/profile', {
        headers: {
          'Authorization': `Bearer ${token}`  // Correct format with Bearer
        }
      })
      .then((response) => {
        setProfile(response.data.profile);  // Handle profile data
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch profile: ' + (err.response?.data?.msg || err.message));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p><strong>Full Name:</strong> {profile.fullname}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
