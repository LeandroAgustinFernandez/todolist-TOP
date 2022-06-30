import task from "./task";

const menu = ["Inbox", "Today", "This week", "Projects"];
const newTask = task();

function component(func) {
  const content = document.createElement("section");
  content.setAttribute("class", "w-100 pt-5");
  content.setAttribute("id", "todolist");
  const h1 = document.createElement("h1");
  h1.textContent = `Inbox`;
  h1.setAttribute("id", "actualMenu");
  h1.setAttribute("class", "text-center");
  content.appendChild(h1);
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

function todolist(category = null, data = null) {
  let list = newTask.getTaskList(category, data) || [];
  const tbody = document.createElement("tbody");
  tbody.setAttribute("style", "font-size:1.1rem");
  tbody.appendChild(createHeaderTable());
  list.forEach((task) => {
    // let id = list.indexOf(task);
    const tr = document.createElement("tr");
    tr.setAttribute('style','border-bottom: 1px solid lightgrey')
    task.check ? tr.classList.add("done") : ``;
    const tdDone = document.createElement("td");
    const tdTitle = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdDate = document.createElement("td");
    const tdProject = document.createElement("td");
    const tdActions = document.createElement("td");
    tdDone.innerHTML = !task.check
      ? `<i class="fa-solid fa-circle-notch" data-id="${task.id}"></i>`
      : `<i class="fa-solid fa-circle-check" data-id="${task.id}"></i>`;
    tdTitle.textContent = task.title;
    tdDescription.textContent = task.description;
    tdDate.textContent = task.date;
    tdProject.textContent = task.project;
    tdActions.innerHTML = `<i class="fa-solid fa-circle-minus" data-id="${task.id}"></i>&nbsp&nbsp&nbsp<i class="fa-solid fa-pen-to-square" data-id="${task.id}"></i>`;
    tdActions.setAttribute("style", "text-align: right");
    tr.appendChild(tdDone);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdDate);
    tr.appendChild(tdProject);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
  if ((category == null && data == null) || data == "inbox")
    tbody.appendChild(newTaskLine());
  return createTable(tbody);
}

function newTaskLine() {
  const tr = document.createElement("tr");
  const tdDone = document.createElement("td");
  const tdTitle = document.createElement("td");
  const tdDescription = document.createElement("td");
  const tdDate = document.createElement("td");
  const tdProject = document.createElement("td");
  const tdActions = document.createElement("td");
  tdDone.innerHTML = `<i class="fa-solid fa-circle-notch"></i>`;
  tdActions.innerHTML = `<i class="fa-solid fa-circle-plus"></i>`;
  tdActions.setAttribute("style", "text-align: right");
  tr.appendChild(tdDone);
  tr.appendChild(tdTitle);
  tr.appendChild(tdDescription);
  tr.appendChild(tdDate);
  tr.appendChild(tdProject);
  tr.appendChild(tdActions);
  return tr;
}

function createHeaderTable() {
  const tr = document.createElement("tr");
  const thDone = document.createElement("th");
  const thTitle = document.createElement("th");
  const thDescription = document.createElement("th");
  const thDate = document.createElement("th");
  const thProject = document.createElement("th");
  const thActions = document.createElement("th");
  thDone.textContent = ""
  thTitle.textContent = "Title"
  thDescription.textContent = "Description"
  thDate.textContent = "Date"
  thProject.textContent = "Project"
  thActions.textContent = "Actions"
  thActions.setAttribute("style", "text-align: center");
  tr.appendChild(thDone);
  tr.appendChild(thTitle);
  tr.appendChild(thDescription);
  tr.appendChild(thDate);
  tr.appendChild(thProject);
  tr.appendChild(thActions);
  return tr;
}

function createTable(tbody) {
  const table = document.createElement("table");
  table.setAttribute("class", "table table-borderless mx-auto");
  table.appendChild(tbody);
  return table;
}

function getProjects() {
  const ul = document.createElement("ul");
  ul.classList.add("projectlist");
  if (newTask.getProjects() != null) {
    let projects = newTask.getProjects();
    projects.forEach((project) => {
      const li = document.createElement("li");
      li.textContent = project;
      li.dataset.project = project;
      li.classList.add("project");
      ul.appendChild(li);
    });
    return ul;
  }
  return ul;
}

function reloadProjects() {
  const aside = document.getElementById("aside");
  aside.lastChild.remove();
  aside.appendChild(getProjects());
  setProjectListener();
}

function getMenu() {
  const ul = document.createElement("ul");
  menu.forEach((element) => {
    const li = document.createElement("li");
    const h2 = document.createElement("p");
    h2.textContent = element;
    li.appendChild(h2);
    li.dataset.menu = element.toLowerCase();
    if (element != "Projects") li.classList.add("menu");
    ul.appendChild(li);
  });
  return ul;
}

function setMenuListener() {
  let menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    menu.addEventListener("click", () => {
      let content = document.querySelector("#todolist");
      content.innerHTML = "";
      const h1 = document.createElement("h1");
      h1.textContent = `${menu.textContent ? menu.textContent : "Inbox"}`;
      h1.setAttribute("class", "text-center");
      h1.setAttribute("id", "actualMenu");
      content.appendChild(h1);
      content.appendChild(todolist(null, menu.dataset.menu));
    });
  });
}

function setProjectListener() {
  let items = document.querySelectorAll(".project");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      let content = document.querySelector("#todolist");
      content.innerHTML = "";
      const h1 = document.createElement("h1");
      h1.textContent = `${item.textContent}`;
      h1.setAttribute("class", "text-center");
      h1.setAttribute("id", "actualMenu");
      content.appendChild(h1);
      content.appendChild(todolist(item.dataset.project, null));
    });
  });
}
// TODO: REFACTORIZAR
function reloadList() {
  let category = null;
  let data = null;
  let actualMenu = document.querySelector("#actualMenu").textContent;
  let content = document.querySelector("#todolist");
  content.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = `${actualMenu ? actualMenu : "Inbox"}`;
  h1.setAttribute("id", "actualMenu");
  h1.setAttribute("class", "text-center");
  content.appendChild(h1);
  menu.indexOf(actualMenu) == -1
    ? (category = actualMenu)
    : (data = actualMenu.toLowerCase());
  if (newTask.getTaskList(category, data).length == 0) {
    h1.textContent = `Inbox`;
    content.appendChild(todolist(null, null));
  } else {
    content.appendChild(todolist(category, data));
  }
}

function setActionButtonListener() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-circle-minus")) {
      deleteTask(e.target);
      reloadList();
      reloadProjects();
    }
    if (e.target.classList.contains("fa-pen-to-square")) {
      createFormEditTask(e.target);
      return;
    }
    if (
      e.target.classList.contains("fa-circle-notch") ||
      e.target.classList.contains("fa-circle-check")
    ) {
      changeTaskStatus(e.target);
    }
    if (e.target.classList.contains("fa-floppy-disk")) {
      updateTask(e.target);
      reloadList();
      reloadProjects();
      return;
    }
    if (e.target.classList.contains("fa-circle-plus")) {
      createFormNewTask(e.target);
    }
    if (e.target.classList.contains("fa-ban")) {
      reloadList();
      reloadProjects();
    }
  });
}

function createFormNewTask(element) {
  let taskline = element.parentElement.parentElement;
  taskline.children[1].innerHTML = `<input type="text" class="form-control"/>`;
  taskline.children[2].innerHTML = `<input type="text" class="form-control"/>`;
  taskline.children[3].innerHTML = `<input type="date" class="form-control"/>`;
  taskline.children[4].innerHTML = `<input type="text" class="form-control"/>`;
  let td = element.parentElement;
  td.removeChild(element);
  td.innerHTML = `<i class="fa-solid fa-ban"></i>&nbsp&nbsp&nbsp<i class="fa-solid fa-floppy-disk"></i>`;
}

function deleteTask(element) {
  newTask.delTask(element.dataset.id);
  let taskLine = element.parentElement.parentElement;
  let table = taskLine.parentElement;
  table.removeChild(taskLine);
}

function updateTask(element) {
  let taskline = element.parentElement.parentElement;
  let date = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  let task = {
    id: element.dataset.id,
    title: taskline.children[1].firstElementChild.value,
    description: taskline.children[2].firstElementChild.value,
    date:
      taskline.children[3].firstElementChild.value != ""
        ? taskline.children[3].firstElementChild.value
        : date,
    project: taskline.children[4].firstElementChild.value,
  };
  newTask.updateTask(task);
  taskline.children[1].textContent =
    taskline.children[1].firstElementChild.value;
  taskline.children[2].textContent =
    taskline.children[2].firstElementChild.value;
  taskline.children[3].textContent =
    taskline.children[3].firstElementChild.value;
  taskline.children[4].textContent =
    taskline.children[4].firstElementChild.value;
  element.classList.add("fa-pen-to-square");
  element.classList.remove("fa-floppy-disk");
  if (element.previousSibling.previousSibling.classList.contains("fa-ban")) {
    element.previousSibling.previousSibling.classList.remove("fa-ban");
    element.previousSibling.previousSibling.classList.add("fa-circle-minus");
  }
}

function createFormEditTask(element) {
  let taskline = element.parentElement.parentElement;
  let newDate = new Date(taskline.children[3].textContent);
  newDate = newDate.setDate(newDate.getDate() + 1);
  let date = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(newDate);
  taskline.children[1].innerHTML = `<input type="text" value="${taskline.children[1].textContent}"/>`;
  taskline.children[2].innerHTML = `<input type="text" value="${taskline.children[2].textContent}"/>`;
  taskline.children[3].innerHTML = `<input type="date" value="${date}"/>`;
  taskline.children[4].innerHTML = `<input type="text" value="${taskline.children[4].textContent}"/>`;
  element.classList.remove("fa-pen-to-square");
  element.classList.add("fa-floppy-disk");
  return;
}

function changeTaskStatus(element) {
  newTask.setTaskStatus(element.dataset.id);
  if (element.classList.contains("fa-circle-notch")) {
    element.classList.remove("fa-circle-notch");
    element.classList.add("fa-circle-check");
    element.parentElement.parentElement.classList.add("done");
  } else {
    element.classList.remove("fa-circle-check");
    element.classList.add("fa-circle-notch");
    element.parentElement.parentElement.classList.remove("done");
  }
}

export default function init() {
  let main = document.querySelector("#content");
  main.innerHTML = "";
  main.appendChild(asidenav());
  main.appendChild(component(todolist()));
  setProjectListener();
  setActionButtonListener();
  setMenuListener();
}

//
