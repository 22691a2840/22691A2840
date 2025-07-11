const dotenv = require('dotenv');
dotenv.config(); 

const app = require('./app');
const mongoose = require('mongoose');
const loggingMiddleware = require('./middleware/loggingMiddleware');

app.use(loggingMiddleware);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB Error:", err));
