const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const logger = require('./utils/logger');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/api', urlRoutes);

module.exports = app;
