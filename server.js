/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const { Product } = db.models

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next)
})

app.put('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then( product => {
      product.isSpecial = !product.isSpecial
      return product.save()
    })
    .then( product => res.send(product))
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`))

db.sync()
  .then(() => db.seed())
