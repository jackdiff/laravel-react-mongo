import React, { Component, Fragment } from 'react'
import { Form, Input, Icon } from 'semantic-ui-react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import State from 'config/state'
import categoryStore from 'store/CategoryStore'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

@observer
export default class ImportFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileImport: props.store.fileImport,
      loadFile: false,
      category: props.store.category,
    }
    this.handleFile = this.handleFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
    categoryStore.loadAll()
  }

  handleCategory(e, obj) {
    this.setState({category: obj.value})
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileType = file.type;
    reader.onloadend = () => {
      this.setState({
        fileImport: {
          sourceURL: URL.createObjectURL(file),
          name: file.name,
          file,
          type: file.type,
          source: reader.result,
        },
        loadFile: false
      });
    };
    this.setState({loadFile: true})
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    if(this.state.fileImport) {
      this.props.store.fetchStructure({
        fileImport: this.state.fileImport,
        category: this.state.category,
      })
      e.preventDefault();
    }
  }

  render() {
    return (
      <Form loading={this.props.store.state == State.FETCHING || categoryStore.state == State.FETCHING}>
        <Form.Group widths='equal'>
          <Form.Select value={this.state.category} onChange={this.handleCategory} fluid label='Danh mục khách hàng' options={categoryStore.options} placeholder='-' />
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <label htmlFor="file">
              {this.state.loadFile ? <Icon loading={true} size='large'/> : <Icon name='file alternate outline' size='large'/>}
              Select Excel File
            </label>
            {this.state.fileImport && <span>{this.state.fileImport.name}</span>}
            <Input id='file' style={{display: 'none'}} type='file' onChange={this.handleFile}/>
          </Form.Field>
        </Form.Group>
        <Form.Button primary onClick={this.handleSubmit}>Submit</Form.Button>
      </Form>
    )
  }
}
