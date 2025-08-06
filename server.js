const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve music files from 'music' folder at /music URL
app.use('/music', express.static(path.join(__dirname, 'music')));

// API route to list all mp3 files in 'music' folder
app.get('/api/songs', (req, res) => {
  const musicDir = path.join(__dirname, 'music');
  fs.readdir(musicDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not list songs' });

    const mp3Files = files.filter(file => file.endsWith('.mp3'));
    res.json(mp3Files);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
console.log("Server updated");

