import React, { Component, Fragment } from 'react'
import { Form, Step } from 'semantic-ui-react'
import { observer } from "mobx-react"
import ImportFile from 'elements/ImportFile'
import FormatStructure from 'elements/FormatStructure'

import ImportStore from "store/ImportStore";
const importStore = new ImportStore()
importStore.setFields(window.bundle)

@observer 
export default class ImportCustomer extends Component {
  constructor(props) {
    super(props)    
    this.handleStep = this.handleStep.bind(this)
  }

  handleStep(e, {name}) {
    importStore.setStep(name)
  }

  render() {
    return (
      <Fragment>
        <Step.Group ordered>
          <Step name={1} onClick={this.handleStep} active={importStore.step == 1} completed={importStore.steps[1].completed} disabled={importStore.steps[1].disabled}>
            <Step.Content>
              <Step.Title>UPLOAD</Step.Title>
              <Step.Description>Upload .xlsx file </Step.Description>
            </Step.Content>
          </Step>

          <Step name={2} onClick={this.handleStep} active={importStore.step == 2} completed={importStore.steps[2].completed} disabled={importStore.steps[2].disabled}>
            <Step.Content>
              <Step.Title>FORMAT</Step.Title>
              <Step.Description>Format nội dung upload </Step.Description>
            </Step.Content>
          </Step>

          <Step name={3} onClick={this.handleStep} active={importStore.step == 3} completed={importStore.steps[3].completed} disabled={importStore.steps[3].disabled}>
            <Step.Content>
              <Step.Title>Process</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        { importStore.step ==1 && <ImportFile store={importStore} /> }
        { importStore.step ==2 && <FormatStructure store={importStore} />}
      </Fragment>
    )
  }
}
