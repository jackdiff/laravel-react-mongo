import mobx, { observable, computed, action, flow } from "mobx"
import axios from 'axios'
import api, {makeDefaultHeader} from 'config/api'
import State from 'config/state'

class ImportStores {
  @observable state = State.IDLE //0/1/2/3
  @observable error = {}
  @observable format = []
  @observable fields = {}
  @observable fileImport = {}
  @observable category = ''
  @observable step = 1
  @observable steps = {
    1: {completed: false, disabled: false},
    2: {completed: false, disabled: true},
    3: {completed: false, disabled: true}
  }

  @computed
  get getError() {
    return this.error
  }

  @action
  setStep(step) {
    this.step = step
  }

  getStructure(sheet) {
    return this.format[sheet].structure
  }

  getHeader(sheet) {
   return this.format[sheet].header 
  }

  getField(sheet) {
    return this.fields[sheet]
  }

  @action
  selectField(sheet, id, field) {
    this.fields[sheet][id] = field
  }

  @action
  fetchStructure = flow(function * (form) {
    this.format = []
    this.fields = {}
    this.state = State.FETCHING
    try {
      const response = yield this.fetchStructureAPI(form)
      if(response.status == 200) {
        this.state = State.SUCCESS
        this.fileImport = form.fileImport
        this.category = form.category
        this.format = response.data.format
        Object.keys(response.data.format).map(sheet => this.fields[sheet] = response.data.format[sheet].header)
        this.step = 2;
        this.steps[1].completed = true;
        this.steps[2].disabled = false;
        this.error = []
      } else {
        this.state = State.ERROR
        this.error = response.data.errors
      }
    } catch (error) {
      this.state = State.ERROR
      this.error = {common: 'Can not connect to server!'}
    }
  })

  @action
  fetchStructureAPI(form) {
    const data = new FormData()
    data.append('category', form.category)
    data.append('fileImport', form.fileImport.file)

    let header = makeDefaultHeader()
    return axios.post(api.ANALYZE_STRUCTURE, data, {header})
  }

  @action
  upload = flow(function * (form) {
    this.state = State.FETCHING
    try {
      const response = yield this.submitUpload()
      if(response.status == 200) {
        this.state = State.SUCCESS
        this.fileImport = {}
        this.category = ''
        this.format = []
        this.fields = []
        this.step = 3;
        this.steps[2].completed = true;
        this.steps[3].disabled = false;
        this.error = []
      } else {
        this.state = State.ERROR
        this.error = response.data.errors
      }
      
    } catch (error) {
      this.state = State.ERROR
      this.error = {common: 'Can not connect to server!'}
    }
  })

  @action
  submitUpload() {
    const data = new FormData()
    data.append('category', this.category)
    data.append('fileImport', this.fileImport.file)
    data.append('fields', JSON.stringify(this.fields))

    let header = makeDefaultHeader()
    return axios.post(api.IMPORT, data, {header});
  }
}

export default new ImportStores
