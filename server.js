const express = require('express');
const app = express();
const path = require('path');

// Init middleware
app.use(express.json({ limit: '1mb' }));

// Only required for development
// app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/requests', require('./routes/api/requests'));
app.use('/api/complaints', require('./routes/api/complaints'));
app.use('/api/blockchain', require('./routes/api/blockchain'));
app.use('/api/scrapper', require('./routes/api/scrapper'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/data-visualization', require('./routes/api/data-visualization'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve static folder
  app.use(express.static('client/path'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
