import { observable, computed, action, flow } from "mobx"
import axios from 'axios'
import api, {makeDefaultHeader} from 'config/api'

import CategoryModel from "models/CategoryModel"
import State from 'config/state'

export default class CategoryStores {
  @observable categories = [];
  @observable state = State.IDLE;
  @observable error = {};
  @observable showModal = null;

  @computed
  get allCategories() {
    return this.categories
  }

  @action
  addCategory(category) {
    this.categories.push(new CategoryModel(category._id, category.name));
  }

  @action
  updateCategory(category) {
    const uIx = this.categories.findIndex(el => el.id == category._id)
    if(uIx >= 0) this.categories[uIx].name = category.name
  }

  @action
  remove(id) {
    const rmIx = this.categories.findIndex(el => el.id == id)
    this.categories.splice(rmIx, 1)
  }

  @action
  showForm(category = {}) {
    this.showModal = category;
  }

  @action
  hideForm() {
    this.showModal = null;
  }

  @action
  clear() {
    this.state = State.IDLE
    this.error = {}
    this.hideForm()
  }

  @action
  loadAll = flow(function * (name) {
    this.state = State.FETCHING
    try {
      const response = yield this.fetchLoadAll()
      if(response.data.success) {
        this.state = State.SUCCESS
        const cates = response.data.categories.map((category) => new CategoryModel(category._id, category.name))
        this.categories = cates
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
    return axios.get(api.LIST_CATEGORY, {}, {header});
  }

  @action
  requestAdd = flow(function * (name, id = null) {
    this.state = State.FETCHING
    try {
      const response = yield this.fetchRequestAdd(name, id)
      if(response.data.success) {
        this.state = State.SUCCESS
        this.showModal = null
        if(id) {
          this.updateCategory(response.data.category)
        } else {
          this.addCategory(response.data.category)
        }
        this.error = {}
      } else {
        this.state = State.ERROR
        this.error = response.data.errors
      }  
    } catch (error) {
      console.log(error)
      this.state = State.ERROR
      this.error = {name: 'Can not connect to server!'}
    }
  })

  @action
  fetchRequestAdd(name, id) {
    let header = makeDefaultHeader()
    return axios.post(api.ADD_CATEGORY, {name, id}, {header});
  }

  @action
  requestRemove = flow(function * (id) {
    this.state = State.FETCHING
    try {
      const response = yield this.fetchRequestRemove(id)
      if(response.data.success) {
        this.state = State.SUCCESS
        this.remove(id)
      } else {
        this.state = State.ERROR
      }
    } catch (error) {
      this.state = State.ERROR
    }
  })

  @action
  fetchRequestRemove(id) {
    let header = makeDefaultHeader()
    return axios.post(api.REMOVE_CATEGORY + id, {}, {header});
  }
}
