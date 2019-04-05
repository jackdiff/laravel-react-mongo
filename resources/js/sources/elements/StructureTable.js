import React, { Component, Fragment } from 'react'
import { Table, Select, Container, Button } from 'semantic-ui-react'
import { observer } from "mobx-react"

export default class StructureTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  makeRow() {
    return this.props.structure.structure.map(data => {
      return (<Table.Row>
        {data.map(el => <Table.Cell>{el}</Table.Cell>)}
      </Table.Row>)
    })
  }

  render() {
    return (
      <Fragment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              {this.props.structure.header.map((key, i) => ( <Table.HeaderCell singleLine key={i}><Select options={this.props.store.fields} defaultValue={key}/></Table.HeaderCell>))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.makeRow()}
          </Table.Body>
        </Table>
        <Container>
          <Button primary onClick={this.handleOpen} >Process</Button>
        </Container>
      </Fragment>
    )
  }
}
