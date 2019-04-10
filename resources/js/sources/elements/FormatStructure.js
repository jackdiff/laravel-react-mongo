import React, { Component, Fragment } from 'react'
import { Tab } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StoreContext from 'store/Context'
import StructureTable from 'elements/StructureTable'


@observer
export default class FormatStructure extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const panes = Object.keys(this.context.importStore.format).map(key => ({ menuItem: key , render: () => <Tab.Pane key={key} className="scroll"><StructureTable prefixKey={key}/></Tab.Pane> }))
    return (
      <Tab panes={panes}/>
    )
  }
}
