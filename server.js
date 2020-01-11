const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
//process.env.PORT when we deploye Horukou

app.listen(PORT, err => {
  if (err) console.log('Server failed to running');
  console.log(`the server is running on port ${PORT}`);
});
