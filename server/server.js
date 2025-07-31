const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/logistics');

app.use(express.json());
app.get('/', (req, res) => res.send('Server running'));
app.listen(5000, () => console.log("Server started on port 5000"));

