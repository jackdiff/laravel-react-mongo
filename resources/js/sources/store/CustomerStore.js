import mobx, { observable, computed, action, flow } from "mobx"
import axios from 'axios'
import api, {makeDefaultHeader} from 'config/api'
import State from 'config/state'

class CustomerStores {
  @observable state = State.IDLE; //0/1/2/3
  @observable error = {};
  @observable fields = [];

  @action
  setFields(fields) {
    let options = Object.keys(fields).map(key => ({key: key, value: key, text: fields[key]}))
    options.unshift({key: '-', value: '', text: '---'})
    this.fields = options
  }

}

export default new CustomerStores
