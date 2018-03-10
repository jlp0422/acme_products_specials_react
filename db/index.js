/* eslint-disable */
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/demo_db', {
  logging: false
})

const Product = conn.define('product', {
  name: Sequelize.STRING,
  isSpecial: Sequelize.BOOLEAN
})

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Product.create({ name: 'Crockpot', isSpecial: true }),
    Product.create({ name: 'Blender', isSpecial: false }),
    Product.create({ name: 'Toaster Oven', isSpecial: false })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    Product
  }
}
