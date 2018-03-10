/* eslint-disable */
import React from 'react';

const Products = (props) => {
  const { onChange, regularButtonClick, specialButtonClick, productToSpecial, productToRegular, specialProds, regularProds } = props
  return (
    <div>
      <h1>Acme React Products</h1>
      <h2>We have {specialProds.length} special {
        specialProds.length === 1 ? `product` : `products`
      }</h2>

      <h3>Regular Products</h3>
      <form onSubmit={ regularButtonClick } >
        <select onChange={onChange} value={ productToSpecial.id }>
          <option value=''>Select product</option>
          {
            regularProds.map(product => (
              <option key={product.id} value={product.id} >{product.name}</option>
            ))
          }
        </select>
        <button disabled={ !productToSpecial.id }>Make Special</button>
      </form>

      <h3>Special Products</h3>
      <form onSubmit={ specialButtonClick }>
        <select onChange={ onChange } value={ productToRegular.id }>
          <option value=''>Select product</option>
          {
            specialProds.map(product => (
              <option key={product.id} value={product.id} >{product.name}</option>
            ))
          }
        </select>
        <button disabled={ !productToRegular.id }>Make Regular</button>
      </form>
    </div>
  )
}

export default Products
