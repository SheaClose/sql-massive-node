require('dotenv').config();
const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000,
  app = express(),
  massive = require('massive'),
  products_controller = require('./products_controller');

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

app.post('/products', products_controller.create);
app.get('/products/:id', products_controller.getOne);
app.put('/products/:id', products_controller.update);

app.listen(port, function() {
  console.log('Server listening on port', port);
});
