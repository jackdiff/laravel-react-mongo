import React, { Component, Fragment } from 'react'
import { Table, Pagination, Container, Segment } from 'semantic-ui-react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import StoreContext from 'store/Context'
import State from 'config/state'

@observer
export default class Customer extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleSort = this.handleSort.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }

  componentDidMount() {
    this.context.customerStore.loadAll()
  }

  handleSort(col) {

  }

  makeHeader() {
    const column = this.context.customerStore.sortcol
    const direction = this.context.customerStore.sort
    return Object.keys(this.context.customerStore.fields).map(key => (<Table.HeaderCell
        sorted={column === key ? direction : null}
        onClick={this.handleSort(key)}
        className={this.context.customerStore.getStyle(key)}
      >
        {this.context.customerStore.fields[key]}
      </Table.HeaderCell>))
  }

  makeRow(row) {
    return Object.keys(this.context.customerStore.fields).map(key => (
      <Table.Cell>{row[key]}</Table.Cell>
    ))
  }

  makeBody() {
    const customers = this.context.customerStore.data
    return customers.map(e => {
      return (<Table.Row>{this.makeRow(e)}</Table.Row>)
    })
  }

  handlePaginationChange(e, {activePage}) {
    this.context.customerStore.gotoPage(activePage)
  }

  render() {
    return (
      <Fragment>
        <Segment loading={this.context.customerStore.state == State.FETCHING} style={{overflow: 'scroll'}}>
          <Container textAlign='right'><Pagination
            onPageChange={this.handlePaginationChange}
            activePage={this.context.customerStore.currentPage} 
            totalPages={this.context.customerStore.maxPage} />
            </Container>
          <Table sortable compact celled>
            <Table.Header>
              <Table.Row>
                {this.makeHeader()}
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.makeBody()}
            </Table.Body>
          </Table>
          <Container textAlign='right'><Pagination
            onPageChange={this.handlePaginationChange}
            activePage={this.context.customerStore.currentPage} 
            totalPages={this.context.customerStore.maxPage} />
          </Container>
        </Segment>
      </Fragment>
    )
  }
}
