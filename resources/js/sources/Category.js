import React, { Component, Fragment } from 'react'
import { Grid, Table, Icon, Modal, Header, Button, Form, Container, Message } from 'semantic-ui-react'
import CategoryForm from 'elements/CategoryForm'
import CategoryTable from 'elements/CategoryTable'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <Container>
          <CategoryForm/>
        </Container>
        <CategoryTable/>
      </Fragment>
    )
  }
}
