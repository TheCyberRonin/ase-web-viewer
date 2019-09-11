const express = require('express');

const app = express();
const port = 3000;
// Serve static files
app.use('/', express.static('./build/static'));

app.listen(port);

console.log(`Listening on port ${port}`);
