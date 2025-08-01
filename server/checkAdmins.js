const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/logistics')
  .then(() => User.find({ role: 'admin' }))
  .then(admins => {
    console.log('Admin users:', admins);
    process.exit();
  })
  .catch(err => console.error('Error:', err));
