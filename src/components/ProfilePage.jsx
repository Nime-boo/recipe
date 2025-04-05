import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";


const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Not logged in.</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">👤 Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.preference && <p><strong>Diet:</strong> {user.preference}</p>}
      <button onClick={logout} className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Log Out</button>
    </div>
  );
};

export default ProfilePage;
