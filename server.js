const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
//process.env.PORT when we deploye Horukou

app.listen(PORT, err => {
  if (err) console.log('Server failed to running');
  console.log(`the server is running on port ${PORT}`);
});
