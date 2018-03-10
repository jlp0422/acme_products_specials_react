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
    this.specialButtonClick = this.specialButtonClick.bind(this)
    this.regularButtonClick = this.regularButtonClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    const specialProds = []
    const regularProds = []
    axios.get('/api/products')
      .then(res => res.data)
      .then( products => this.setState({ allProducts: products }))
      .then(() => {
        this.state.allProducts.map(product => (
          product.isSpecial ? specialProds.push(product) : regularProds.push(product)
        ))
      })
      .then(() => this.setState({ specialProds, regularProds }))
  }

  specialButtonClick(ev) {
    ev.preventDefault()
    this.makeRegular(this.state.productToRegular)
  }

  regularButtonClick(ev) {
    ev.preventDefault()
    this.makeSpecial(this.state.productToSpecial)
  }

  onChange(ev) {
    const id = ev.target.value
    const prod = this.state.allProducts.find(product => product.id === id * 1)
    prod.isSpecial ? this.setState({ productToRegular: prod }) : this.setState({ productToSpecial: prod })
    console.log(this.state)
      // this.setState({ productToChange: prod })
    // }
  }

  makeRegular(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data)
      .then( product => {
        const newState = this.state.specialProds.filter(_product => _product.id !== product.id)
        this.setState({ specialProds: newState, regularProds: [...this.state.regularProds, product] })
      })
      .then(() => this.setState({ productToRegular: {} }))
  }

  makeSpecial(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => {
        const newState = this.state.regularProds.filter(_product => _product.id !== product.id)
        this.setState({ regularProds: newState, specialProds: [...this.state.specialProds, product ]})
      })
      .then(() => this.setState({ productToSpecial: {} }))
  }

  render() {
    const { specialProds, regularProds, productToSpecial, productToRegular } = this.state
    const { regularButtonClick, specialButtonClick, onChange } = this
    return (
      <Products specialProds={ specialProds } regularProds={ regularProds } specialButtonClick={ specialButtonClick } regularButtonClick={ regularButtonClick } onChange={ onChange } productToRegular={ productToRegular } productToSpecial={ productToSpecial }/>
    )
  }
}
