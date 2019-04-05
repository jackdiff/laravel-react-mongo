import { observable } from "mobx";

export default class CategoryModel {
  @observable name;

  constructor(id, name) {
    this.name = name;
    this.id = id;
  }
}