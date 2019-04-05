import React, { Component, Fragment } from 'react'
import { Table, Icon, Confirm , Segment} from 'semantic-ui-react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import State from 'config/state'

@observer
export default class CategoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm : null
    }
    this.delete = this.delete.bind(this)
    this.confirm = this.confirm.bind(this)
    props.store.loadAll()
  }

  confirm (id) {
    this.setState({confirm: id})
  }

  delete(id) {
    this.props.store.requestRemove(this.state.confirm)
    this.setState({confirm: null})
  }

  update(category) {
    this.props.store.showForm(category)
  }

  render() {
    return (
      <Segment loading={this.props.store.state == State.FETCHING}>
      <Table celled striped >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>Danh mục khách hàng</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.props.store.categories.map(category => (
          <Table.Row key={category.id}>
            <Table.Cell>{category.name}</Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              <Icon name='edit' onClick={() => this.update(category)}/>
              <Icon name='remove' onClick={() => this.confirm(category.id)} />
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
        <Confirm content='Có chắc chắn xoá không ?' open={this.state.confirm != null} onCancel={() => this.setState({confirm: null})} onConfirm={this.delete} />
      </Table>
      </Segment>
    )
  }
}
