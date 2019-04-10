import React, { Component, Fragment } from 'react'
import { Grid, Table, Icon, Modal, Header, Button, Form, Container, Message } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StoreContext from 'store/Context'

@observer
export default class CategoryForm extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleOpen() {
    this.context.categoryStore.showForm();
  }

  handleClose() {
    this.context.categoryStore.clear()
  }

  handleAdd() {
    if(this.newCategory.value) {
      this.context.categoryStore.requestAdd(this.newCategory.value, this.context.categoryStore.showModal.id)
    }
  }

  render() {
    let category = this.context.categoryStore.showModal;
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
        open={this.context.categoryStore.showModal != null}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='address book' content={category.id ? 'Cập nhật danh mục khách hàng!' :'Thêm danh mục khách hàng mới!'} />
        <Modal.Content>
          <Form error={this.context.categoryStore.error.name ? true : false}>
            <Form.Field>
              <label>Danh mục</label>
              <input placeholder='category' ref={(el) => this.newCategory = el} defaultValue={category.name}/>
            </Form.Field>
            {this.context.categoryStore.error && <Message
              error
              content={this.context.categoryStore.error.name}
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
