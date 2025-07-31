const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/logistics');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('Server running'));
app.listen(5000, () => console.log("Server started on port 5000"));

