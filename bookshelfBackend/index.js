const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '' // configure as needed
};
app.use(cors(corsOptions));

app.use(require('./routes')); 

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}!`));
