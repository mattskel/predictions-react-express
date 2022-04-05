const express = require('express');
const app = express();
const users = require('./routes/users');

app.use('/api/users', users);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});