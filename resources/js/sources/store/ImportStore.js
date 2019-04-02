import { observable, computed, action, flow } from "mobx"
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

  @computed
  get getError() {
    return this.error
  }

  fetchStructure = flow(function * (form) {
    this.format = []
    this.state = State.FETCHING
    try {
      const data = yield this.fetchStructureAPI(form)
      this.state = State.SUCCESS
      this.format = data.format
      this.error = []
    } catch (error) {
      console.log(error)
      this.state = State.ERROR
      this.error = error
    }
  })

  fetchStructureAPI(form) {
    const data = new FormData();
    data.append('category', form.category);
    data.append('file', form.fileImport.file);

    let header = makeDefaultHeader()
    return axios.post(api.IMPORT_STRUCTURE, data, {header});
  }

}
