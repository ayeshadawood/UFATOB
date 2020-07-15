const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { addMessage } = require('./utils/chat');

// Setting up express server to user SocketIO
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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

// Setup SocketIO to send and receive messages in real time in chat module
io.on('connection', (socket) => {
  // This is called whenever a user joins the chat
  socket.on('joinRoom', ({ user, room }) => {
    // Add user to the room
    socket.join(room);

    // Broadcast the message in the room that the user has joined the chat
    socket.broadcast.emit('joinRoom', `${user.name} has joined the chat`);
  });

  // This is called whenever the user sends a message
  socket.on('message', async ({ room, user, message }) => {
    // Add message to the conversation
    const conversation = await addMessage(room, user, message);

    // Broadcast the conversation object to everyone in the room
    io.to(room).emit('message', conversation);
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
