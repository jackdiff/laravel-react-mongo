import React, { Component, Fragment } from 'react'
import { Grid, Table, Icon, Modal, Header, Button, Form, Container, Message } from 'semantic-ui-react'
import CategoryForm from 'elements/CategoryForm'
import CategoryTable from 'elements/CategoryTable'
import CategoryStore from "store/CategoryStore";

const categoryStore = new CategoryStore()

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleEdit(category) {
    
  }

  render() {
    return (
      <Fragment>
        <Container>
          <CategoryForm store={categoryStore}/>
        </Container>
        <CategoryTable store={categoryStore}/>
      </Fragment>
    )
  }
}
