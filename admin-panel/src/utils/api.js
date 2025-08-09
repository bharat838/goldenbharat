import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 Login API
export const login = (email, password) =>
  API.post("/auth/login", { email, password });

// 🔹 Get Current User API
export const getUser = (token) =>
  API.get("/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // ✅ Backend URL
// });

// export const login = (email, password) =>
//   API.post("/auth/login", { email, password });

// export const getUser = (token) =>
//   API.get("/auth/user", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// // ✅ Attach Token Automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;
