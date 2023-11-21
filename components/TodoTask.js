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
      this.modifyBtnClickListener();
      this.deleteBtnClickListener();
      this.completeBtnClickListener();
      this.saveModification();
    }

    modifyBtnClickListener() {
      this.querySelector(".modify-btn").addEventListener("click", () => {
        if (this.id == "on-edit") {
          this.saveModification();
          this.querySelector(".modify-btn i").classList.remove("fa-check");
          this.querySelector(".modify-btn i").classList.add("fa-pen");
        } else {
          modify(this);
          this.querySelector(".modify-btn i").classList.remove("fa-pen");
          this.querySelector(".modify-btn i").classList.add("fa-check");
        }
      });
    }

    deleteBtnClickListener() {
      this.querySelector(".delete-btn").addEventListener("click", () => {
        this.classList.add("delete-todo-item-animation");
        setTimeout(() => {
          deleteTask();
        }, 400);
      });
    }

    completeBtnClickListener() {
      this.querySelector(".complete-btn").addEventListener("click", () => {
        completeTask();
      });
    }

    saveModification() {
      this.id = "";
      document.querySelector("main").classList.toggle("set-focuse");

      this.querySelector("h3").innerText = titleTextarea.value;
      this.querySelector(
        "h4"
      ).innerText = `${startDate.value} | ${endDate.value}`;
      this.querySelector("p").innerText = descriptionTextarea.value;

      prioritySwitch.disabled = false;
      document
        .querySelector(".aside-cancel-btn")
        .classList.toggle("disable-style");
      document
        .querySelector(".aside-save-btn")
        .classList.toggle("disable-style");
      clearInputFields();
    }

    deleteTask() {
      this.parentNode.removeChild(this);
    }

    completeTask() {
        deleteTask(task);
        this.classList.add("completed-item");
        let completedTasksDiv = document.querySelector(".completed-todos");
        completedTasksDiv.appendChild(this);
      }
      
      modify() {
        this.id = "on-edit";
        document.querySelector("main").classList.toggle("set-focuse");
        // extractValueFromTaskToInput(task);
      
        // prioritySwitch.disabled = true;
        document.querySelector(".aside-cancel-btn").classList.toggle("disable-style");
        document.querySelector(".aside-save-btn").classList.toggle("disable-style");
      }
  }
);
