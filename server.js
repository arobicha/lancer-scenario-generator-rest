const express = require('express');
const { scenarioGenerate } = require('./scenario-generator-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Lancer Scenario Generator REST API',
    endpoints: {
      '/api/scenario': 'GET - Generate a random scenario',
      '/': 'GET - This help message'
    }
  });
});

// Generate scenario endpoint
app.get('/api/scenario', (req, res) => {
  try {
    const scenario = scenarioGenerate();
    res.json(scenario);
  } catch (error) {
    console.error('Error generating scenario:', error);
    res.status(500).json({ error: 'Failed to generate scenario' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Lancer Scenario Generator API is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/scenario to generate a scenario`);
});
