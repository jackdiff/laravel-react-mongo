import React, { Component, Fragment } from 'react'
import { Form, Step } from 'semantic-ui-react'
import { observer } from "mobx-react"
import StoreContext from 'store/Context'
import ImportFile from 'elements/ImportFile'
import FormatStructure from 'elements/FormatStructure'

@observer 
export default class ImportCustomer extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props)    
    this.handleStep = this.handleStep.bind(this)
  }

  handleStep(e, {name}) {
    this.context.importStore.setStep(name)
  }

  render() {
    return (
      <Fragment>
        <Step.Group ordered>
          <Step name={1} onClick={this.handleStep} active={this.context.importStore.step == 1} completed={this.context.importStore.steps[1].completed} disabled={this.context.importStore.steps[1].disabled}>
            <Step.Content>
              <Step.Title>UPLOAD</Step.Title>
              <Step.Description>Upload .xlsx file </Step.Description>
            </Step.Content>
          </Step>

          <Step name={2} onClick={this.handleStep} active={this.context.importStore.step == 2} completed={this.context.importStore.steps[2].completed} disabled={this.context.importStore.steps[2].disabled}>
            <Step.Content>
              <Step.Title>FORMAT</Step.Title>
              <Step.Description>Format nội dung upload </Step.Description>
            </Step.Content>
          </Step>

          <Step name={3} onClick={this.handleStep} active={this.context.importStore.step == 3} completed={this.context.importStore.steps[3].completed} disabled={this.context.importStore.steps[3].disabled}>
            <Step.Content>
              <Step.Title>Process</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        { this.context.importStore.step ==1 && <ImportFile/> }
        { this.context.importStore.step ==2 && <FormatStructure/>}
        { this.context.importStore.step ==3 && <h3>DONE!</h3>}
      </Fragment>
    )
  }
}
