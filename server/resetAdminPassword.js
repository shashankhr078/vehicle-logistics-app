// resetAdminPassword.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

async function resetPassword() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/logistics');

    // 2. Generate new hash
    const newHash = bcrypt.hashSync("123456", 10);
    console.log("New hash:", newHash);

    // 3. Update admin password
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: "admin@example.com" },
      { $set: { password: newHash } }
    );

    console.log(`Updated ${result.modifiedCount} admin user`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resetPassword();
