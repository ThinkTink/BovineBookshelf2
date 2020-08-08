const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const corsOptions = {
  origin: '' // configure as needed
};
app.use(cors(corsOptions));

app.use(helmet());

app.use(compression());

app.use(require('./routes')); 

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}!`));
