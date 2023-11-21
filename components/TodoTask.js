import { clearInputFields } from "../assets";

customElements.define(
  "todo-task",
  class TodoTask extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
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
      this.querySelector(".modify-btn").addEventListener("click", () => {
        if (this.id == "on-edit") {
          this.id = "";
          document.querySelector("main").classList.toggle("set-focuse");
          this.querySelector("h3").innerText = document.querySelector(
            'textarea[name="title-textarea"]'
          ).value;

          this.querySelector("h4").innerText = `${
            document.querySelector("#start").value
          } | ${document.querySelector("#End").value}`;
          this.querySelector("p").innerText = document.querySelector(
            'textarea[name="description-textarea"]'
          ).value;

          document.querySelector('input[type="checkbox"]').disabled = false;
          document
            .querySelector(".aside-cancel-btn")
            .classList.toggle("disable-style");
          document
            .querySelector(".aside-save-btn")
            .classList.toggle("disable-style");
        this.querySelector(".modify-btn i").classList.remove("fa-check");
        this.querySelector(".modify-btn i").classList.add("fa-pen");
        } else {
          this.id = "on-edit";
          document.querySelector("main").classList.toggle("set-focuse");
          document.querySelector('input[type="checkbox"]').disabled = true;
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

      this.deleteBtnClickListener();
      this.completeBtnClickListener();
      this.saveModification();
    }

    onModify() {
      if (this.id == "on-edit") {
      }
    }

    deleteBtnClickListener() {
      this.querySelector(".delete-btn").addEventListener("click", () => {
        this.classList.add("delete-todo-item-animation");
        setTimeout(() => {
          this.deleteTask();
        }, 400);
      });
    }

    completeBtnClickListener() {
      this.querySelector(".complete-btn").addEventListener("click", () => {
        this.completeTask();
      });
    }

    saveModification() {
      clearInputFields();
    }

    deleteTask() {
      this.parentNode.removeChild(this);
    }

    completeTask() {
      this.classList.add("completed-item");
      let completedTasksDiv = document.querySelector(".completed-todos");
      completedTasksDiv.appendChild(this);
    }

    modify() {
      // extractValueFromTaskToInput(task);
    }
  }
);
