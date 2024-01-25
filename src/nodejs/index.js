const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());

app.get('/current-time', (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.json({ time: currentTime });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
