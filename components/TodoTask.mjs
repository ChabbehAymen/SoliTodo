import { InputsHandler } from "../assets/InputsHandler.mjs";
import storageHandler from "../data/StorageHandler.mjs";

export default class TodoTask extends HTMLElement {
  constructor() {
    super();
    this.inputsHnadler = new InputsHandler();
  }
  connectedCallback() {
    this.uid = this.getAttribute('uid');
    this.innerHTML = `
      <div class="todo-item">
      <div class="item-header">
      <hr>
      <div class="item-details">
      <div class="title-div">
      <h3>${this.getAttribute("title")}</h3>
      <button class="modify-btn"><i class="fa fa-pen"></i></button>
      </div>
      <h4>${this.getAttribute("start-date")} | ${this.getAttribute(
      "end-date"
    )}</h4>
      </div>
      </div>
      <p>${this.getAttribute("description")}</p>
      <div class="items-btns">
      <button class="delete-btn"><i class="fa fa-trash"></i></button>
      <button class="complete-btn"><i class="fa fa-check"></i></button>
      </div>
      </div>
      `;
      let titleView = this.querySelector("h3");
      let dateView = this.querySelector("h4");
      let descriptionView = this.querySelector("p");
    this.querySelector(".modify-btn").addEventListener("click", () => {
      if (this.id == "on-edit") {
        this.id = "";
        document.querySelector("main").classList.toggle("set-focuse");

        titleView.innerText = this.inputsHnadler.getTitle;

        dateView.innerText = `${this.inputsHnadler.getStartDate} | ${this.inputsHnadler.getEndDate}`;

        descriptionView.innerText = this.inputsHnadler.getDiscreption;

        this.inputsHnadler.inablePrioritySwitch(false);
        document
          .querySelector(".aside-cancel-btn")
          .classList.toggle("disable-style");
        document
          .querySelector(".aside-save-btn")
          .classList.toggle("disable-style");
        this.querySelector(".modify-btn i").classList.remove("fa-check");
        this.querySelector(".modify-btn i").classList.add("fa-pen");
        storageHandler.updateModifiedTask(this.#getTaskObject());
        this.inputsHnadler.clearInputs();
      } else {
        this.id = "on-edit";
        document.querySelector("main").classList.toggle("set-focuse");
        this.inputsHnadler.setTitle = titleView.innerText;
        this.inputsHnadler.setDiscreption = descriptionView.innerText;
        this.inputsHnadler.setStartDate = dateView.innerText.slice(0,10);
        this.inputsHnadler.setEndDate = dateView.innerText.slice(-10);
        this.inputsHnadler.inablePrioritySwitch(true);
        document
          .querySelector(".aside-cancel-btn")
          .classList.toggle("disable-style");
        document
          .querySelector(".aside-save-btn")
          .classList.toggle("disable-style");
        this.querySelector(".modify-btn i").classList.remove("fa-pen");
        this.querySelector(".modify-btn i").classList.add("fa-check");
      }
    });

    this.querySelector(".delete-btn").addEventListener("click", () => {
      this.classList.add("delete-todo-item-animation");
      setTimeout(() => {
        storageHandler.deleteItemFromStorage(this.uid);
        this.deleteTask();
      }, 400);
    });
    this.completeBtnClickListener();
  }

  completeBtnClickListener() {
    this.querySelector(".complete-btn").addEventListener("click", () => {
      this.completeTask();
    });
  }

  deleteTask() {
    this.parentNode.removeChild(this);
  }

  completeTask() {
    this.classList.add("completed-item");
    let completedTasksDiv = document.querySelector(".completed-todos");
    completedTasksDiv.appendChild(this);
  }

  #getTaskObject(){
    return{
      id: `${this.uid}`,
      title: this.inputsHnadler.getTitle,
      discreption: this.inputsHnadler.getDiscreption,
      startDate: this.inputsHnadler.getStartDate,
      endDate: this.inputsHnadler.getEndDate,
      isCompleted: false,
      isPriority: storageHandler.getItemById(this.uid).isPriority}
  }

  setAttributes(attributes, values){
  for (let i = 0; i < attributes.length; i++) {
    this.setAttribute(attributes[i], values[i]);
  }
  }
}
