const axios = require('axios');
const { sourceAuthUrl, connectionSetupUrl } = require('../config/airbyte');

exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post(sourceAuthUrl, {
      username,
      password,
    });

    res.status(200).json({
      message: 'Authenticated successfully',
      token: response.data.token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

exports.setupDestination = (req, res) => {
  const { destinationConfig } = req.body;

  // Save the destinationConfig in your local storage or database
  // For example purposes, we are just returning the config back
  res.status(200).json({
    message: 'Destination setup successfully',
    destinationConfig,
  });
};

exports.setupConnection = async (req, res) => {
  const { sourceToken, destinationConfig } = req.body;

  try {
    const response = await axios.post(connectionSetupUrl, {
      sourceToken,
      destinationConfig,
    });

    res.status(200).json({
      message: 'Connection setup successfully',
      connectionId: response.data.connectionId,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to set up connection',
      error: error.message,
    });
  }
};
