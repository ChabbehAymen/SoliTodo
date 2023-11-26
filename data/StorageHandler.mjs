/*
*In this module i used @Singleton patter so that will be only one object instance of this class
*/ 
let instance;
class StorageHandler {
  constructor() {
    if (instance) return instance;
    else instance = this;
  }
  #tasks = [];
  getDataFromStorage() {
    this.#tasks = JSON.parse(localStorage.getItem("tasks"));
    return this.#tasks;
  }

  addItemToStorage(item) {
    this.#tasks.push(item);
    this.#pushArrayToStorage();
  }

  updateModifiedTask(item) {
    console.log(item);
    for (const task of this.#tasks) {
      if (task.id == item.id) {
        this.#tasks.splice(this.#tasks.indexOf(task),1,item);
      }
    }
    this.#pushArrayToStorage();
  }

  deleteItemFromStorage(uid) {
    for (const task of this.#tasks) {
      console.log('storage', task.id, uid);
      if (task.id == uid) {
        console.log(task);
        this.#tasks.pop(task);
      }
    }
    this.#pushArrayToStorage();
  }

  getItemById(id){
    for (const task of this.#tasks) {
      if (task.id == id) return task;
    }
  }

  #pushArrayToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }
}
const storageHandler = Object.freeze(new StorageHandler());

export default storageHandler;
