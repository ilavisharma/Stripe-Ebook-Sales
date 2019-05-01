const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: process.env.PUBLISHABLE_KEY
  });
});

// Charge Route
app.post('/charge', (req, res) => {
  const amount = 2500;

  // create the customer
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        // charge the customer
        amount,
        description: 'Crush It Ebook',
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
