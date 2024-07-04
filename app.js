const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());

// Authenticate user to Airbyte source
app.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post(
      "https://airbyte-source-url.com/authenticate",
      {
        username,
        password,
      }
    );

    res.status(200).json({
      message: "Authenticated successfully",
      token: response.data.token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
});

// Set up local API as destination
app.post("/setup-destination", (req, res) => {
  const { destinationConfig } = req.body;

  // Save the destinationConfig in your local storage or database
  // For example purposes, we are just returning the config back
  res.status(200).json({
    message: "Destination setup successfully",
    destinationConfig,
  });
});

// Set up connection to trigger data transfer
app.post("/setup-connection", async (req, res) => {
  const { sourceToken, destinationConfig } = req.body;

  try {
    // Use Airbyte API to set up the connection between source and destination
    const response = await axios.post(
      "https://airbyte-connection-url.com/setup",
      {
        sourceToken,
        destinationConfig,
      }
    );

    res.status(200).json({
      message: "Connection setup successfully",
      connectionId: response.data.connectionId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to set up connection",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
