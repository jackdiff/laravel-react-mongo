import mobx, { observable, computed, action, flow } from "mobx"
import axios from 'axios'
import api, {makeDefaultHeader} from 'config/api'
import State from 'config/state'

class CustomerStores {
  @observable state = State.IDLE; //0/1/2/3
  @observable error = {};
  @observable fieldOptions = [];
  @observable fields = {};
  @observable fieldStyles = {};
  @observable data = [];
  @observable currentPage = 1;
  @observable maxPage = 1;
  @observable sortcol = '';
  @observable sort = '';
  @observable filters = {
    category: '',
    name: '',
    address: '',
    tel: '',
  }
  pagesize = 25

  @action
  setFilter(key, value) {
    this.filters[key] = value;
  }

  @action
  setFields(fields, fieldStyles) {
    let options = Object.keys(fields).map(key => ({key: key, value: key, text: fields[key]}))
    options.unshift({key: '-', value: '', text: '---'})
    this.fields = fields
    this.fieldStyles = fieldStyles
    this.fieldOptions = options
  }

  getStyle(field) {
    console.log(field, this.fieldStyles[field])
    return this.fieldStyles[field]
  }

  @action
  search() {
    this.currentPage = 1
    this.loadAll()
  }

  @action
  gotoPage(page) {
    this.currentPage = page
    this.loadAll()
  }
  @action
  loadAll = flow(function * () {
    this.state = State.FETCHING
    try {
      const response = yield this.fetchLoadAll()
      if(response.data.success) {
        this.state = State.SUCCESS
        this.maxPage = response.data.customer.last_page
        this.data = response.data.customer.data
      } else {
        this.state = State.ERROR
      }
      
    } catch (error) {
      this.state = State.ERROR
    }
  })

  @action
  fetchLoadAll() {
    let header = makeDefaultHeader()
    return axios.get(api.LIST_CUSTOMER, {params: {page: this.currentPage, ...this.filters}}, {header});
  }

}

export default new CustomerStores
