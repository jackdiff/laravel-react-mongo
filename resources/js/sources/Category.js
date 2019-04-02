import React, { Component, Fragment } from 'react'
import { Grid, Table, Icon, Modal, Header, Button, Form, Container } from 'semantic-ui-react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"

@observer
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleAdd() {
    if(this.newCategory.value) {
      this.props.store.addCategory(this.newCategory.value)
      this.handleClose()
    }
  }

  render() {
    return (
      <Fragment>
        <Container>
        <Modal
          trigger={<Button primary animated='vertical' onClick={this.handleOpen}>
            <Button.Content hidden>Add</Button.Content>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
          </Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'
        >
          <Header icon='address book' content='Thêm danh mục khách hàng mới!' />
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Danh mục</label>
                <input placeholder='category' ref={(el) => this.newCategory = el}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.handleClose}>Cancel</Button>
            <Button color='green' onClick={this.handleAdd} inverted>
              <Icon name='checkmark' /> Submit
            </Button>
          </Modal.Actions>
        </Modal>
        </Container>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Danh mục khách hàng</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.props.store.categories.map(category => (
            <Table.Row>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell collapsing textAlign='right'>
                <Icon name='edit' />
                <Icon name='remove' />
              </Table.Cell>
            </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Fragment>
    )
  }
}
