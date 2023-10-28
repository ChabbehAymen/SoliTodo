let prioritiesTasks = [];
let allTasks = [];
let completedTasks = [];

document.querySelector('.aside-save-btn').addEventListener('click', ()=>{
  // document.querySelector('.all-todos').appendChild();
  allTasks.push(createTask());
  updateUi();

})

function updateUi() {
  let allTasksDiv = document.querySelector('.all-todos')
  allTasksDiv.innerHTML = '';
  allTasks.forEach((div)=>{
    allTasksDiv.appendChild(div);
  })
}



function createTask() {
  let todoItemContainer = document.createElement("div");
  todoItemContainer.classList.add("todo-item");
  let taskHeader = crateItemHeader();
  let taskBody = craeteItemDiscreption();
  let itemBtns = createTaskBtns();
  todoItemContainer.appendChild(taskHeader);
  todoItemContainer.appendChild(taskBody);
  todoItemContainer.appendChild(itemBtns);
  todoItemContainer.id = allTasks.length;
  return todoItemContainer;
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
  let taskTitelText = document.createTextNode(document.querySelector('textarea[name="title-textarea"]').value);
  let taskTitle = document.createElement("h3");
  taskTitle.appendChild(taskTitelText);
  itemDetails.appendChild(taskTitle);

  //task Date
  let detailsText = document.createTextNode(`${document.querySelector('#start').value} | ${document.querySelector('#End').value}`);
  let createDetails = document.createElement("h4");
  createDetails.appendChild(detailsText);
  itemDetails.appendChild(createDetails);
  return itemHeader;
}

function craeteItemDiscreption() {
  let taskDiscText = document.createTextNode(
    document.querySelector('textarea[name="description-textarea"]').value
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
