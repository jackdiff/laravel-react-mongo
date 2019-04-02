import { observable, computed, action } from "mobx";

import CategoryModel from "models/CategoryModel";

export default class CategoryStores {
  @observable categories = [];

  @computed
  get allCategories() {
    return this.categories
  }

  @action
  addCategory(name) {
    this.categories.push(new CategoryModel(name));
  }
}
