import mobx, { observable, computed, action, flow } from "mobx"
import axios from 'axios'
import api, {makeDefaultHeader} from 'config/api'

export const State = {
    FETCHING : 1,
    IDLE: 0,
    SUCCESS: 2,
    ERROR: 3
}

export default class ImportStores {
  @observable state = State.IDLE; //0/1/2/3
  @observable error = {};
  @observable format = [];
  @observable fields = [];
  @observable fileImport = {};
  @observable category = '';
  @observable step = 1;
  @observable steps = {
    1: {completed: false, disabled: false},
    2: {completed: false, disabled: true},
    3: {completed: false, disabled: true}
  };

  @computed
  get getError() {
    return this.error
  }

  @action
  setStep(step) {
    this.step = step
  }

  @action
  setFields(fields) {
    let options = Object.keys(fields).map(key => ({key: key, value: key, text: fields[key]}))
    options.unshift({key: '-', value: '', text: '---'})
    this.fields = options
  }

  @action
  fetchStructure = flow(function * (form) {
    this.format = []
    this.state = State.FETCHING
    try {
      const response = yield this.fetchStructureAPI(form)
      if(response.status == 200) {
        this.state = State.SUCCESS
        this.fileImport = form.fileImport
        this.category = form.category
        this.format = response.data.format
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
    const data = new FormData();
    data.append('category', form.category);
    data.append('fileImport', form.fileImport.file);

    let header = makeDefaultHeader()
    return axios.post(api.IMPORT_STRUCTURE, data, {header});
  }

}
