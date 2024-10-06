const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// Sample API route
app.get('/api/cars', (req, res) => {
  res.send({ message: 'Lets get ya rollin on some new Wheels!' });
});
app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the backend!' });
});  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
