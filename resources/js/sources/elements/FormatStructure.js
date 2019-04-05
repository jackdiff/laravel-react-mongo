import React, { Component, Fragment } from 'react'
import { Tab } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StructureTable from 'elements/StructureTable'


@observer
export default class FormatStructure extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const panes = Object.keys(this.props.store.format).map(key => ({ menuItem: key , render: () => <Tab.Pane className="scroll"><StructureTable store={this.props.store} structure={this.props.store.format[key]} /></Tab.Pane> }))
    return (
      <Tab panes={panes}/>
    )
  }
}
