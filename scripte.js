let todoItemContainer = document.createElement("div");
todoItemContainer.classList.add("todo-item");
todoItemContainer.appendChild(itemHeader);

// task body

todoItemContainer.appendChild(discHolder);

// task btns

todoItemContainer.appendChild(taskBtnsContainer);
let todosContainer = document.querySelector(".all-todos");
todosContainer.appendChild(todoItemContainer);

function createTask() {
  let todoItemContainer = document.createElement("div");
  todoItemContainer.classList.add("todo-item");
}

function crateItemHeader() {
  let itemHeader = document.createElement("div");
  itemHeader.classList.add("item-header");
  let indicator = document.createElement("hr");
  itemHeader.appendChild(indicator);

  let itemDetails = document.createElement("div");
  itemDetails.classList.add("item-details");
  itemHeader.appendChild(itemDetails);

  // task title
  let taskTitelText = document.createTextNode("Complete Html");
  let taskTitle = document.createElement("h3");
  taskTitle.appendChild(taskTitelText);
  itemDetails.appendChild(taskTitle);

  //task Date
  let detailsText = document.createTextNode("15-10-2023 | 15-10-2023");
  let createDetails = document.createElement("h4");
  createDetails.appendChild(detailsText);
  itemDetails.appendChild(createDetails);
  return itemHeader;
}

function craeteItemDiscreption() {
  let taskDiscText = document.createTextNode(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  );
  let discHolder = document.createElement("p");
  discHolder.appendChild(taskDiscText);
  return discHolder;
}

function createTaskBtns() {
  let taskBtnsContainer = document.createElement("div");
  taskBtnsContainer.classList.add("items-btns");
  let cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.textContent = "Cancel";

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "Complete";

  taskBtnsContainer.appendChild(cancelBtn);
  taskBtnsContainer.appendChild(completeBtn);
  return taskBtnsContainer;
}
