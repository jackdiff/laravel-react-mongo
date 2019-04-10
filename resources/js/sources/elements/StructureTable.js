import React, { Component, Fragment } from 'react'
import { Table, Select, Container, Button, Segment } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StoreContext from 'store/Context'

@observer
export default class StructureTable extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleProcess = this.handleProcess.bind(this)
  }

  makeRow() {
    const sheet = this.props.prefixKey
    const structure = this.context.importStore.getStructure(sheet)
    if(!structure) {
      return []
    }
    return structure.map(data => {
      return (<Table.Row>
        {data.map(el => <Table.Cell>{el}</Table.Cell>)}
      </Table.Row>)
    })
  }

  handleSelectHeader(sheet, id, field) {
    this.context.importStore.setFields(sheet, id, field)
  }

  handleSetField(obj, sheet, id) {
    this.context.importStore.selectField(sheet, id, obj.value)
  }

  handleProcess() {
    this.importStore.upload()
  }

  makeHeader() {
    const sheet = this.props.prefixKey
    const structure = this.context.importStore.getHeader(sheet)
    const fields = this.context.importStore.getField(sheet)
    if(structure) {
      return structure.map((key, i) => ( 
      <Table.HeaderCell singleLine key={this.props.prefixKey + i}>
        <Select value={fields[i]} options={this.context.customerStore.fields} onChange={(e, obj) => this.handleSetField(obj, sheet, i)}/>
      </Table.HeaderCell>))
    }
    return []
    
  }

  render() {
    return (
      <Segment loading={this.context.importStore.state == State.FETCHING}>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              {this.makeHeader()}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.makeRow()}
          </Table.Body>
        </Table>
        <Container>
          <Button primary onClick={this.handleProcess} >Process</Button>
        </Container>
      </Segment>
    )
  }
}
