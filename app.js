const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
