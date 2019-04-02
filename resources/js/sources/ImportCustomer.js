import React, { Component, Fragment } from 'react'
import { Form, Step } from 'semantic-ui-react'
import ImportFile from 'elements/ImportFile'

import ImportStore from "store/ImportStore";
const importStore = new ImportStore()

export default class ImportCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      steps: {
        1: {completed: false},
        2: {completed: false},
        3: {completed: false}
      },
    }
    this.handleStep = this.handleStep.bind(this)
  }

  handleStep(e, {name}) {
    this.setState({step: name})
  }

  render() {
    return (
      <Fragment>
        <Step.Group ordered>
          <Step name={1} onClick={this.handleStep} active={this.state.step == 1} completed={this.state.steps[1].completed}>
            <Step.Content>
              <Step.Title>UPLOAD</Step.Title>
              <Step.Description>Upload .xlsx file </Step.Description>
            </Step.Content>
          </Step>

          <Step name={2} onClick={this.handleStep} active={this.state.step == 2} completed={this.state.steps[2].completed}>
            <Step.Content>
              <Step.Title>FORMAT</Step.Title>
              <Step.Description>Format nội dung upload </Step.Description>
            </Step.Content>
          </Step>

          <Step name={3} onClick={this.handleStep} active={this.state.step == 3} completed={this.state.steps[3].completed}>
            <Step.Content>
              <Step.Title>Confirm</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        <ImportFile store={importStore} />
      </Fragment>
    )
  }
}
