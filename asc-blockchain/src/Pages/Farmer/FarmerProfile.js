import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token
    if (!token) {
      setError("No token found, please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/profiledata/profile", {
        headers: {
          Authorization: ` ${token}`, // Correct format with Bearer
        },
      })
      .then((response) => {
        setProfile(response.data.profile); // Handle profile data
        setBio(response.data.profile.bio || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Failed to fetch profile: " + (err.response?.data?.msg || err.message)
        );
        setLoading(false);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    axios
      .put("http://localhost:5000/api/profiledata/update", formData, {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess("Profile updated successfully!");
        setProfile((prevProfile) => ({
          ...prevProfile,
          bio,
          profileImage: response.data.profileImage,
        }));
      })
      .catch((err) => {
        console.error("error details", err);
        setError(
          "Failed to update profile: " +
            (err.response?.data?.msg || err.message)
        );
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {profile ? (
        <div>
          <p>
            <strong>Full Name:</strong> {profile.user.fullname}
          </p>
          <p>
            <strong>Email:</strong> {profile.user.email}
          </p>
          <p>
            <strong>Contact:</strong> {profile.user.contact}
          </p>
          <p>
            <strong>Address:</strong> {profile.user.address}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio || "Not provided"}
          </p>
          {profile.profileImage && (
            <div>
              <strong>Profile Image:</strong>
              <img
                src={`http://localhost:5000/${profile.profileImage}`}
                alt="Profile"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          )}
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Bio:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
