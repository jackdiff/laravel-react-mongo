import React, { Component, Fragment } from 'react'
import { Form, Input, Icon } from 'semantic-ui-react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import StoreContext from 'store/Context'
import State from 'config/state'

@observer
export default class ImportFile extends Component {
  static contextType = StoreContext
  constructor(props) {
    super(props)
    this.state = {
      fileImport: null,
      loadFile: false,
      category: null,
    }
    this.handleFile = this.handleFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }

  componentDidMount() {
    this.context.categoryStore.loadAll()
    this.setState({
      fileImport: this.context.importStore.fileImport,
      loadFile: false,
      category: this.context.importStore.category,
    })
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
      this.context.importStore.fetchStructure({
        fileImport: this.state.fileImport,
        category: this.state.category,
      })
      e.preventDefault();
    }
  }

  render() {
    return (
      <Form loading={this.context.importStore.state == State.FETCHING || this.context.categoryStore.state == State.FETCHING}>
        <Form.Group widths='equal'>
          <Form.Select value={this.state.category} onChange={this.handleCategory} fluid label='Danh mục khách hàng' options={this.context.categoryStore.options} placeholder='-' />
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
