const express = require('express');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
});

app.get('/api/products', function (req, res) {
  const lang = req.query.lang || 'en';
  let products = require('./mock.products.' + lang + '.json').products;

  if (req.query.idList) {
    products = products.filter(item => req.query.idList.indexOf(item.id) > -1);
  }

  if (req.query.hasOwnProperty('localize')) {
    products = products.map(item => {
      const { id, name, description} = item;
      return { id, name, description};
    })
  }

  const total = products.length;
  const offset = Number(req.query.offset);
  const count = Number(req.query.count);

  if (offset >= 0 && count > 0) {
    products = products.slice(offset, offset + count);
  }

  setTimeout(() => res.send({ products, total }), 750);
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
