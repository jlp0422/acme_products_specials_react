/* eslint-disable */
import React from 'react';

export default class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      productId: ''
    }
  }

  render() {
    const { specialProds, regularProds, onChange, buttonClick, productId } = this.props
    return (
      <div>
        <h1>Acme React Products</h1>
        <h2>We have {specialProds.length} special {
          specialProds.length === 1 ? `product` : `products`
        }</h2>

        <h3>Regular Products</h3>
        <form onSubmit={ buttonClick } >
          <select onChange={onChange} value={ productId }>
            <option value=''>Select product</option>
            {
              regularProds.map(product => (
                <option key={product.id} value={product.id} >{product.name}</option>
              ))
            }
          </select>
          <button>Make Special</button>
        </form>

        <h3>Special Products</h3>
        <form onSubmit={ buttonClick }>
          <select onChange={ onChange } value={ productId }>
            <option value=''>Select product</option>
            {
              specialProds.map(product => (
                <option key={product.id} value={product.id} >{product.name}</option>
              ))
            }
          </select>
          <button>Make Regular</button>
        </form>
      </div>
    )
  }
}
