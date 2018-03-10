/* eslint-disable */
import React from 'react';

export default class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      regularProds: [],
      specialProds: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ regularProds: nextProps.regularProds, specialProds: nextProps.specialProds})
  }

  render() {
    const { onChange, buttonClick, productToChange, specialProds, regularProds } = this.props
    // const {  } = this.state
    return (
      <div>
        <h1>Acme React Products</h1>
        <h2>We have {specialProds.length} special {
          specialProds.length === 1 ? `product` : `products`
        }</h2>

        <h3>Regular Products</h3>
        <form onSubmit={ buttonClick } >
          <select onChange={onChange} value={ productToChange.id }>
            <option value=''>Select product</option>
            {
              regularProds.map(product => (
                <option key={product.id} value={product.id} >{product.name}</option>
              ))
            }
          </select>
          <button disabled={ productToChange.id === 0 }>Make Special</button>
        </form>

        <h3>Special Products</h3>
        <form onSubmit={ buttonClick }>
          <select onChange={ onChange } value={ productToChange.id }>
            <option value=''>Select product</option>
            {
              specialProds.map(product => (
                <option key={product.id} value={product.id} >{product.name}</option>
              ))
            }
          </select>
          <button disabled={ productToChange.id === 0 }>Make Regular</button>
        </form>
      </div>
    )
  }
}
