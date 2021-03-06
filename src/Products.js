/* eslint-disable */
import React from 'react';

const Products = (props) => {
  const { onChange, formSubmit, productToSpecial, productToRegular, specialProds, regularProds } = props
  // console.log(props)
  return (
    <div>
      <h1>Acme React Products</h1>
      <h2>We have {specialProds.length} special {
        specialProds.length === 1 ? `product` : `products`
      }</h2>

      <h3 style={{ marginTop: 20 }}>Regular Products</h3>
      <form onSubmit={ formSubmit } >
        <select onChange={onChange} value={ productToSpecial.id }>
          <option value=''>Select product</option>
          {
            regularProds.map(product => (
              <option key={product.id} value={product.id} >{product.name}</option>
            ))
          }
        </select>
        <button className="btn btn-info" disabled={ !productToSpecial.id }>Make Special</button>
      </form>

      <h3 style={{ marginTop: 40 }}>Special Products</h3>
      <form onSubmit={ formSubmit }>
        <select onChange={ onChange } value={ productToRegular.id }>
          <option value=''>Select product</option>
          {
            specialProds.map(product => (
              <option key={product.id} value={product.id} >{product.name}</option>
            ))
          }
        </select>
        <button className="btn btn-info" disabled={ !productToRegular.id }>Make Regular</button>
      </form>
    </div>
  )
}

export default Products
