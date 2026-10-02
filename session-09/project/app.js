const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const app = express();
const PORT = 3000;

app.use('/', routes);