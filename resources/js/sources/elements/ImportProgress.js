import React, { Component, Fragment } from 'react'
import { Progress } from 'semantic-ui-react'
import { observer } from "mobx-react"
import State from 'config/state'

export default class ImportProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let progress = 0
    let label = 'Uploading'
    if(this.props.store.state  == State.FETCHING ) {progress = 50;}
    if(this.props.store.state  == State.SUCCESS ) {progress = 100; label="Finished"}
    if(this.props.store.state  == State.ERROR ) {progress = 0; label="Fail"}
    return (
      <Progress percent={progress} label={label} />
    )
  }
}
