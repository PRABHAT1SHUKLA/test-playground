import axios from "axios";
import { useEffect, useState } from "react";

const fetchUserDetails = async (setUser: any, setLoading: any, setError: any) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    console.log(token)

    if (!token) {
      throw new Error("Token not found. Please sign in.");
    }

    const response = await axios.post(
      "http://localhost:3000/me",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    console.log(response)

    setUser({ username: response.data.username });
  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to fetch user details.");
  } finally {
    setLoading(false);
  }
};

const Profile = () => {
  const [user, setUser] = useState({ username: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserDetails(setUser, setLoading, setError);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
    </div>
  );
};

export default Profile;
