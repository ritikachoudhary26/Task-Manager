const BASE_URL = "https://task-manager-uxk7.onrender.com/api";

export const api = async (url, method = "GET", data = null) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }) // only add if token exists
    }
  };

  // Only add body for non-GET requests
  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }
 
  console.log("API call to:", url, "with token:", token);
  const res = await fetch(`http://localhost:5000/api${url}`, options);

  if (!res.ok) {
    // Optional: throw error with status
    throw new Error(`API error! Status: ${res.status}`);
  }

  return res.json();
};