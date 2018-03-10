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
      allProducts: [],
      productToRegular: {},
      productToSpecial: {}
    }
    this.makeSpecial = this.makeSpecial.bind(this)
    this.makeRegular = this.makeRegular.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    // this.regularButtonClick = this.regularButtonClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    const specialProds = []
    const regularProds = []
    axios.get('/api/products')
      .then(res => res.data)
      // .then( products => this.setState({ allProducts: products }))
      .then( products => {
        products.map(product => (
          product.isSpecial ? specialProds.push(product) : regularProds.push(product)
        ))
      })
      .then(() => this.setState({ specialProds, regularProds }))
  }

  formSubmit(ev) {
    ev.preventDefault()
    console.log(this.state)
    this.state.productToRegular.name ? this.makeRegular(this.state.productToRegular) : this.makeSpecial(this.state.productToSpecial)
  }

  onChange(ev) {
    const id = ev.target.value
    const allProducts = this.state.specialProds.concat(this.state.regularProds)
    const prod = allProducts.find(product => product.id === id * 1)
    console.log(prod)
    prod.isSpecial ? this.setState({ productToRegular: prod }) : this.setState({ productToSpecial: prod })
  }

  makeRegular(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data)
      .then( product => {
        console.log(product)
        const newState = this.state.specialProds.filter(_product => _product.id !== product.id)
        this.setState({ specialProds: newState, regularProds: [...this.state.regularProds, product] })
      })
      .then(() => this.setState({ productToRegular: {} }))
  }

  makeSpecial(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => {
        console.log(product)
        const newState = this.state.regularProds.filter(_product => _product.id !== product.id)
        this.setState({ regularProds: newState, specialProds: [...this.state.specialProds, product ]})
      })
      .then(() => this.setState({ productToSpecial: {} }))
  }

  render() {
    const { specialProds, regularProds, productToSpecial, productToRegular } = this.state
    const { formSubmit, onChange } = this
    return (
      <Products specialProds={ specialProds } regularProds={ regularProds } formSubmit={ formSubmit } onChange={ onChange } productToRegular={ productToRegular } productToSpecial={ productToSpecial }/>
    )
  }
}
