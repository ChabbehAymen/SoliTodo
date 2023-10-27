


function createTask() {
    let todoItemContainer = document.createElement('div').classList.add('todo-item');
    let itemHeader = document.createElement('div').classList.add('item-header');
    itemHeader.appendChild(document.createElement('hr'));
    let itemDetails = document.createElement('div').classList.add('item-details');
    // task title
    let taskTitelText = document.createTextNode('Complete Html');
    let taskTitle = document.createElement('h3');
    taskTitle.appendChild(taskTitelText);
    //task Date
    let detailsContainer = document.createElement('div').classList.add('details');
    let detailsText = document.createTextNode('15-10-2023 | 15-10-2023');
    let createDetails = document.createElement('h4');
    createDetails.appendChild(detailsText);
    // task body
    let taskDiscText = document.createTextNode('Lorem ipsum dolor, sit amet consectetur adipisicing elit.');
    let discHolder = document.createElement('p');
    discHolder.appendChild(taskDiscText);
    // task btns
    



}