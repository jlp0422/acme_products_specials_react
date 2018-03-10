/* eslint-disable */
import React from 'react';
import Products from './Products';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      regularProds: [],
      specialProds: [],
      productId: ''
    }
    this.changeProduct = this.changeProduct.bind(this)
    this.buttonClick = this.buttonClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    const specialProds = []
    const regularProds = []
    axios.get('/api/products')
      .then(res => res.data)
      .then( products => (
        products.map( product => (
          product.isSpecial ? specialProds.push(product) : regularProds.push(product)
        ))
      ))
      .then(() => this.setState({ specialProds, regularProds }))
  }

  buttonClick(ev) {
    ev.preventDefault()
    this.changeProduct(this.state.productId)
  }

  onChange(ev) {
    const productId = ev.target.value
    this.setState({ productId })
  }

  changeProduct(productId) {
    axios.put(`/api/products/${productId}`, productId)
      .then(res => res.data)
      .then( product => console.log(product))
  }

  ComponentWillReceiveProps(nextProps) {
    console.log('next props', nextProps)
  }

  render() {
    const { specialProds, regularProds, productId } = this.state
    const { changeProduct, buttonClick, onChange } = this
    return (
      <Products specialProds={ specialProds } regularProds= { regularProds } buttonClick={ buttonClick } onChange={ onChange } productId= { productId }/>
    )
  }
}
