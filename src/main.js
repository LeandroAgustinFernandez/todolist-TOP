import task from "./task";

const menu = ["Inbox", "Today", "This week", "Projects"];

// localStorage.clear();
const newTask = task();
// newTask.createTask(
//   "Probando 6",
//   "Descripcion de probando 1",
//   "01/01/2022",
//   "Cocina"
// );
// newTask.createTask("Probando 2", "Descripcion de probando 2", "02/01/2022", "");
// newTask.createTask(
//   "Probando 7",
//   "Descripcion de probando 3",
//   "03/01/2022",
//   "Compras"
// );
// newTask.createTask(
//   "Probando 8",
//   "Descripcion de probando 4",
//   "04/01/2022",
//   "Entretenimiento"
// );
// newTask.createTask(
//   "Probando 9",
//   "Descripcion de probando 5",
//   "05/01/2022",
//   "Entretenimiento",
//   null,
//   1
// );

function component(func) {
  const content = document.createElement("section");
  content.setAttribute("class", "w-100 pt-5");
  content.setAttribute("id", "todolist");
  const h1 = document.createElement('h1')
  h1.textContent = `ToDo\'s`
  h1.setAttribute('class','text-center')
  content.appendChild(h1)
  content.appendChild(func);
  return content;
}
function asidenav() {
  const content = document.createElement("section");
  content.setAttribute("id", "aside");
  content.appendChild(getMenu());
  content.appendChild(getProjects());
  return content;
}

function todolist(category = null) {
  let list = newTask.getTaskList(category) || [];
  const tbody = document.createElement("tbody");
  tbody.setAttribute('style','font-size:1.1rem')
  list.forEach((task) => {
    let id = list.indexOf(task);
    const tr = document.createElement("tr");
    task.check
      ? tr.classList.add('done')
      : ``;
    const tdDone = document.createElement("td");
    const tdTitle = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdDate = document.createElement("td");
    const tdProject = document.createElement("td");
    const tdActions = document.createElement("td");
    tdDone.innerHTML = !task.check
      ? `<i class="fa-solid fa-circle-notch" data-id="${id}"></i>`
      : `<i class="fa-solid fa-circle-check" data-id="${id}"></i>`;
    tdTitle.textContent = task.title;
    tdDescription.textContent = task.description;
    tdDate.textContent = task.date;
    tdProject.textContent = task.project;
    tdActions.innerHTML = `<i class="fa-solid fa-circle-minus" data-id="${id}"></i>&nbsp&nbsp&nbsp<i class="fa-solid fa-pen-to-square" data-id="${id}"></i>`;
    tr.appendChild(tdDone);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdDate);
    tr.appendChild(tdProject);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
  return createTable(tbody);
}

function createTable(tbody) {
  const table = document.createElement("table");
  table.setAttribute('style','min-width: 80%; width:80%')
  table.setAttribute("class", "table table-borderless mx-auto");
  table.appendChild(tbody);
  return table;
}

function getProjects() {
  let projects = newTask.getProjects();
  const ul = document.createElement("ul");
  ul.classList.add("projectlist");
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project;
    li.dataset.project = project;
    li.classList.add("project");
    ul.appendChild(li);
  });
  return ul;
}

function getMenu() {
  const ul = document.createElement("ul");
  menu.forEach((element) => {
    const li = document.createElement("li");
    const h2 = document.createElement("h3");
    h2.textContent = element;
    li.appendChild(h2);
    li.dataset.menu = element.toLowerCase();
    li.classList.add("menu");
    ul.appendChild(li);
  });
  return ul;
}


function setProjectListener() {
  let items = document.querySelectorAll(".project");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      let content = document.querySelector("#todolist");
      content.innerHTML = "";
      const h1 = document.createElement('h1')
      h1.textContent = `${item.textContent} ToDo\'s`
      h1.setAttribute('class','text-center')
      content.appendChild(h1)
      content.appendChild(todolist(item.dataset.project));
    });
  });
}

function setMenuListener() {}

function setActionButtonListener() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-circle-minus")) {
      newTask.delTask(e.target.dataset.id);
      let taskLine = e.target.parentElement.parentElement;
      let table = taskLine.parentElement;
      table.removeChild(taskLine);
    }
    if (e.target.classList.contains("fa-pen-to-square")) {
      let taskline = e.target.parentElement.parentElement;
      let prueba = new Date(taskline.children[3].textContent)
      prueba = prueba.setDate(prueba.getDate()+1)
      let date = new Intl.DateTimeFormat("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(prueba);
      taskline.children[1].innerHTML = `<input type="text" value="${taskline.children[1].textContent}"/>`;
      taskline.children[2].innerHTML = `<input type="text" value="${taskline.children[2].textContent}"/>`;
      taskline.children[3].innerHTML = `<input type="date" value="${date}"/>`;
      taskline.children[4].innerHTML = `<input type="text" value="${taskline.children[4].textContent}"/>`;
      e.target.classList.remove("fa-pen-to-square");
      e.target.classList.add("fa-floppy-disk");
      return
    }
    if (
      e.target.classList.contains("fa-circle-notch") ||
      e.target.classList.contains("fa-circle-check")
    ) {
      newTask.setTaskStatus(e.target.dataset.id);
      if (e.target.classList.contains("fa-circle-notch")) {
        e.target.classList.remove("fa-circle-notch");
        e.target.classList.add("fa-circle-check");
        e.target.parentElement.parentElement.classList.add('done')
      } else {
        e.target.classList.remove("fa-circle-check");
        e.target.classList.add("fa-circle-notch");
        e.target.parentElement.parentElement.classList.remove('done')
      }
    }
    if (e.target.classList.contains("fa-floppy-disk")) {
      let taskline = e.target.parentElement.parentElement;
      let task = {
        id: e.target.dataset.id,
        title: taskline.children[1].firstElementChild.value,
        description: taskline.children[2].firstElementChild.value,
        date: taskline.children[3].firstElementChild.value,
        project: taskline.children[4].firstElementChild.value,
      };
      newTask.updateTask(task);
      taskline.children[1].textContent = taskline.children[1].firstElementChild.value;
      taskline.children[2].textContent = taskline.children[2].firstElementChild.value;
      taskline.children[3].textContent = taskline.children[3].firstElementChild.value;
      taskline.children[4].textContent = taskline.children[4].firstElementChild.value;
      e.target.classList.add("fa-pen-to-square");
      e.target.classList.remove("fa-floppy-disk");
      return
    }
  });
}

export default function init() {
  let main = document.querySelector("#content");
  main.innerHTML = "";
  main.appendChild(asidenav());
  main.appendChild(component(todolist()));
  setProjectListener();
  setActionButtonListener();
}

//
