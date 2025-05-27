const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: "Hello from Node on Traefik",
    time: new Date(),
    info: {
      node: process.version,
      express: require('express/package.json').version
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} inside traefik-proxy network`)
})
