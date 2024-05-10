const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulated database to store user data
const users = [];

// Endpoint to handle login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Simulated token generation
  const token = "dummy_token";

  res.json({ token });
});

// Endpoint to handle registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Simulated user creation
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);

  // Simulated token generation
  const token = "dummy_token";

  res.json({ token });
});

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Simulated token verification
  if (token !== "dummy_token") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

// Endpoint to get user data
app.get("/api/v1/auth/me", authenticate, (req, res) => {
  // Simulated user data
  const userData = {
    id: 1,
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
  };

  res.json(userData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
