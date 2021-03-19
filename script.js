const addMessage = document.querySelector('.message')
const addButton = document.querySelector('.addButton')
const todo = document.querySelector('.todo')


function init() {
  if (localStorage.getItem("toDoList")) {
    displayData()
  } else {
    localStorage.setItem("toDoList", JSON.stringify([]));
  }
}

function displayData() {
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
  //newData = JSON.parse(localStorage.getItem('toDoList'));
  let sum = ''
  toDoList.forEach(function (item) {
    sum += `
        <li class = 'toDoItems'>
            <input type = 'checkbox' id = '${item.id}' ${item.checked ? 'checked' : ''}>
            <label id = '${item.id}' ${item.checked ? 'style=" text-decoration: line-through;"' : ''} >${item.toDo}</label>
            <button class='buttonClose' onclick='removeElement(${item.id})'>REMOVE</button>
        </li>
        `;
  });
  todo.innerHTML = sum;
}

addButton.addEventListener("click", function () {
  if (addMessage.value.trim().length < 1) return
  let newToDO = {
    toDo: addMessage.value,
    checked: false,
    id: JSON.stringify(Date.now() + Math.random())
  }
  let newData = JSON.parse(localStorage.getItem('toDoList'))
  newData.push(newToDO)
  localStorage.setItem("toDoList", JSON.stringify(newData))
  displayData()
})

todo.addEventListener('change', function (event) {
  let toggleId = event.target.id
  let toDoList = JSON.parse(localStorage.getItem('toDoList'));
  toDoList.forEach(function (item) {
    if (item.id === toggleId) {
      item.checked = !item.checked
    }
  })
  localStorage.setItem('toDoList', JSON.stringify(toDoList))
  displayData()
})

function removeElement(id) {
  let deleteId = id.toString()
  let toDoList = JSON.parse(localStorage.getItem('toDoList'))
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id === deleteId) {
      toDoList.splice(i, 1)
    }
  }
  localStorage.setItem('toDoList', JSON.stringify(toDoList))
  displayData()
}

init();