import React, { Component, Fragment } from 'react'
import { Button, Modal, Icon, Form } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StoreContext from 'store/Context'

@observer
export default class CustomerFilter extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleCategory = this.handleCategory.bind(this)
    this.handleSearchField = this.handleSearchField.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  componentDidMount() {
    this.context.categoryStore.loadAll()
  }

  handleCategory(e, obj) {
    this.context.customerStore.setFilter('category', obj.value)
  }

  handleSearchField(e, {name}) {
    this.context.customerStore.setFilter(name, e.target.value)
  }

  handleFilter() {
    this.context.customerStore.search()
  }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Select value={this.state.category} onChange={this.handleCategory} fluid label='Danh mục' options={this.context.categoryStore.options} placeholder='-' />
          <Form.Input fluid label='Tên' name="name" placeholder='Last name' onChange={this.handleSearchField} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Địa chỉ' name="address" placeholder='First name' onChange={this.handleSearchField} />
          <Form.Input fluid label='SĐT' name="tel" placeholder='Last name' onChange={this.handleSearchField} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Button icon color='orange' onClick={this.handleFilter} ><Icon name='filter'/></Form.Button>
        </Form.Group>
      </Form>
    )
  }
}
