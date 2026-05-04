require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set. Create a .env file or set the env var.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to DB for migration');

  const users = await User.find({});
  let updated = 0;

  for (const u of users) {
    const pw = u.password || '';
    // simple detection: bcrypt hashes usually start with $2
    if (!pw.startsWith('$2')) {
      console.log(`Hashing password for ${u.email}`);
      const hashed = await bcrypt.hash(pw, 12);
      u.password = hashed;
      await u.save();
      updated++;
    }
  }

  console.log(`Migration complete. Updated ${updated} users.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
