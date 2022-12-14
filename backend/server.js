const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/tickets', require('./routes/ticketRoutes'));

//server Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
