import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const ProfilePage = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : "");
  const [newPreference, setNewPreference] = useState(user ? user.preference : "");

  if (!user) return <p className="text-center mt-10">Not logged in.</p>;

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    updateUser({ name: newName, preference: newPreference });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">👤 Your Profile</h2>

      {/* Profile Information Display */}
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Diet Preference</label>
            <input
              type="text"
              value={newPreference}
              onChange={(e) => setNewPreference(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleSaveChanges}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.preference && <p><strong>Diet:</strong> {user.preference}</p>}
          <button
            onClick={handleEditProfile}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
