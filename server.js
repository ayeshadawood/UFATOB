const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connecting database
connectDB();

// Init middleware
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/requests', require('./routes/api/requests'));
// app.use('/api/posts', require('./routes/api/posts'));
// app.use('/api/complaint', require('./routes/api/complaint'));
// app.use('/api/scrapper', require('./routes/api/scrapper'));
// app.use('/api/eventScrapper', require('./routes/api/eventScrapper'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
