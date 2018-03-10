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
      productToChange: {}
    }
    this.makeSpecial = this.makeSpecial.bind(this)
    this.makeRegular = this.makeRegular.bind(this)
    this.buttonClick = this.buttonClick.bind(this)
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

  buttonClick(ev) {
    ev.preventDefault()
    const prod = this.state.productToChange
    prod.isSpecial ? this.makeRegular(prod) : this.makeSpecial(prod)
  }

  onChange(ev) {
    const id = ev.target.value
    const prod = this.state.allProducts.find( product => product.id === id*1)
    this.setState({ productToChange: prod })
  }

  makeRegular(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data)
      .then( product => {
        const newState = this.state.specialProds.filter(_product => _product.id !== product.id)
        this.setState({ specialProds: newState, regularProds: [...this.state.regularProds, product] })
      })
  }

  makeSpecial(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => {
        const newState = this.state.regularProds.filter(_product => _product.id !== product.id)
        this.setState({ regularProds: newState, specialProds: [...this.state.specialProds, product ]})
      })
  }

  // changeProduct(product) {
  //   axios.put(`/api/products/${product.id}`, product)
  //     .then( res => res.data)
  //     .then( product => {
  //       product.isSpeical ? (
  //         this.setState({ specialProds: [...this.state.specialProds, product]})
  //       ) :
  //       (
  //         this.setState({ regularProds: [...this.state.regularProds, product] })
  //       )
  //     })
  // }

  render() {
    const { specialProds, regularProds, productToChange } = this.state
    const { buttonClick, onChange } = this
    return (
      <Products specialProds={ specialProds } regularProds= { regularProds } buttonClick={ buttonClick } onChange={ onChange } productToChange= { productToChange }/>
    )
  }
}
