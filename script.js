// достаем HTML элементы и сохранаем их в константы
const btntheme = document.querySelector(".header__btn");
const btnAdd = document.querySelector(".add__btn");
const modal = document.querySelector(".modal");
const btnCancel = document.querySelector(".modal__cancel");
const todoTemplate = document.querySelector(".todo__template");
const todoItems = document.querySelector(".todo__items");
const modalInput = document.querySelector(".modal__input");
const modalApply = document.querySelector(".modal__apply");
const emptyTemplate = document.querySelector(".empty__template");
const modalTitle = document.querySelector(".modal__title");
const headerInput = document.querySelector(".header__input");
const headerSelect = document.querySelector(".header__select");


// создаем переменную для хранение списка дел(массив)
let list = getList()
  // { text: "note1", isComplete: false },
  // { text: "note2", isComplete: true },
  // { text: "note3", isComplete: false },
  let theme = getTheme()

let editTodo = null;
// вызываем функцию для отрисоыки списка дел на странице
renderList(list);
changeTheme()

function changeTheme() {
  if(theme === "light") {
  document.body.classList.remove("dark");  
  } else{
    document.body.classList.add("dark");  
  }
}
function openModal() {
  modal.classList.add("modal__open");
  if (editTodo !== null) {
    modalTitle.innerHTML = "edit note";
    modalInput.value = editTodo.text;
  } else {
    modalTitle.innerHTML = "new note";
  }
}
function closeModal() {
  modal.classList.remove("modal__open");
  // очищаем содержимое input
  modalInput.value = "";
  editTodo = null;
}
function renderList(array) {
  saveList()
  // очищаем содержимое контейнера перед вставкой
  todoItems.innerHTML = "";
  if (array.length === 0) {
    const clone = emptyTemplate.content.cloneNode(true);
    todoItems.append(clone);
  }
  // forEach позволяет пройтись по элементам массива и для каждого применить фунцию
  array.forEach(function (item, index) {
    console.log(item);
    // копируем разметку из template элемента
    const clone = todoTemplate.content.cloneNode(true);
    // достаем html элементы из скопированой разметки
    const todoItem = clone.querySelector(".todo__item");
    const todoName = clone.querySelector(".todo__name");
    const todoCheck = clone.querySelector(".todo__check");
    const todoDelete = clone.querySelector(".todo__delete");
    const todoEdit = clone.querySelector(".todo__edit");

    // innerHTML - позволяет изменить внутриннея содержимое html  элемента
    todoName.innerHTML = item.text;
    if (item.isComplete === true) {
      todoItem.classList.add("todo__complete");
    }
    todoCheck.onclick = function () {
      completeTodo(item);
    };
    todoDelete.onclick = function () {
      deleteTodo(index);
    };
    todoEdit.onclick = function () {
      editTodo = item;
      openModal();
    };
    // append - позволяет вставить html элемент в конец контейнера
    todoItems.append(clone);
  });
}
function addTodo() {
  // сохранаем введеный польховатем текст
  const value = modalInput.value;
  // создаем услорвие и проверяем тест на пусоту
  if (value === "") {
    //  если условие выполняется, то выполняем код ниже
    //alert - выводит текстовое сообщение юзеру на экран
    alert("fill the input");
  } else {
    // если условие не выполняется
    console.log(value);
    // push - добавляет элемент в конец массива
    list.push({ text: value, isComplete: false });
    // обновляем список на стр. и закрывем модалкуё
    renderList(list);
    closeModal();
  }
}

function completeTodo(item) {
  if (item.isComplete === true) {
    item.isComplete = false;
  } else {
    item.isComplete = true;
  }
  renderList(list);
}

function deleteTodo(deleteindex) {
  list = list.filter(function (item, index) {
    return index !== deleteindex;
  });
  renderList(list);
}

function saveEditTodo() {
  const value = modalInput.value;
  if (value === "") {
    alert("fill the input");
  } else {
    editTodo.text = value;
    renderList(list);
    closeModal();
  }
}

function searchTodo() {
  const value = headerInput.value;
  console.log(value);
  const result = list.filter(function (item, index) {
    return item.text.toLowerCase().includes(value.toLowerCase());
  });
  renderList(result);

}

function selectTodo() {
  const value = headerSelect.value;
  console.log(value)
  if(value === "all"){
    renderList(list)
  }
  else if(value === "complete"){
    const result = list.filter(function (item, index){
      return item.isComplete === true
    })
    renderList(result)
  } 
  else if(value === "incomplete"){
    const result = list.filter(function (item, index) {
      return item.isComplete === false;
    });
    renderList(result);
  }

}

function saveList() {
  localStorage.setItem("list", JSON.stringify(list))
}

function getList() {
  const localList = localStorage.getItem("list")
  if(localList) {
    return JSON.parse(localList)
  } else{
    return []
  }

}

function saveTheme() {
  localStorage.setItem("theme", theme)
}

function getTheme() {
  const localtheme = localStorage.getItem("theme")
  if(localtheme) {
    return localtheme
  } else{
    return "light"
  }
}

btntheme.onclick = function() {
  if(theme === "light") {
    theme = "dark"
  } else{
    theme = "light"
  }
  saveTheme()
 changeTheme()
};
btnAdd.onclick = openModal;
btnCancel.onclick = closeModal;
modalApply.onclick = function () {
  if (editTodo !== null) {
    saveEditTodo();
  } else {
    addTodo();
  }
};
headerInput.oninput = searchTodo;
headerSelect.onchange = selectTodo;
