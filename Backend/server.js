const app = require('./app');
const connectDB = require('./db');

const PORT = 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 