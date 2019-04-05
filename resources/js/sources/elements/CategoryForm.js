import React, { Component, Fragment } from 'react'
import { Grid, Table, Icon, Modal, Header, Button, Form, Container, Message } from 'semantic-ui-react'
import { observer } from "mobx-react"

@observer
export default class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleOpen() {
    this.props.store.showForm();
  }

  handleClose() {
    this.props.store.clear()
  }

  handleAdd() {
    if(this.newCategory.value) {
      this.props.store.requestAdd(this.newCategory.value, this.props.store.showModal.id)
    }
  }

  render() {
    let category = this.props.store.showModal;
    if(!category) {
      category = {}
    }
    return (
      <Modal
        trigger={<Button primary animated='vertical' onClick={this.handleOpen}>
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name='plus' />
          </Button.Content>
        </Button>}
        open={this.props.store.showModal != null}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='address book' content={category.id ? 'Cập nhật danh mục khách hàng!' :'Thêm danh mục khách hàng mới!'} />
        <Modal.Content>
          <Form error={this.props.store.error.name ? true : false}>
            <Form.Field>
              <label>Danh mục</label>
              <input placeholder='category' ref={(el) => this.newCategory = el} defaultValue={category.name}/>
            </Form.Field>
            {this.props.store.error && <Message
              error
              content={this.props.store.error.name}
            />}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>Cancel</Button>
          <Button color='green' onClick={this.handleAdd} inverted>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
