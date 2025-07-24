const mongoose = require('mongoose');

function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/form_builder';
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', (err) => console.error('MongoDB connection error:', err));
  db.once('open', () => console.log('MongoDB connected'));
}

module.exports = connectDB; 