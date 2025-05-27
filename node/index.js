const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello from Node Express at ${new Date().toUTCString()}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} inside traefik-proxy network`)
})
