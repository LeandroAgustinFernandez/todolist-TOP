import task from "./task";

const menu = ["Home", "Today", "This week", "Projects"];

localStorage.clear();
const newTask = task();
newTask.createTask(
  "Probando 1",
  "Descripcion de probando 1",
  "01/01/2022",
  "Cocina"
);
newTask.createTask("Probando 2", "Descripcion de probando 2", "02/01/2022", "");
newTask.createTask(
  "Probando 3",
  "Descripcion de probando 3",
  "03/01/2022",
  "Compras"
);
newTask.createTask(
  "Probando 4",
  "Descripcion de probando 4",
  "04/01/2022",
  "Entretenimiento"
);
newTask.createTask(
  "Probando 5",
  "Descripcion de probando 5",
  "05/01/2022",
  "Entretenimiento"
);

function component(func) {
  const content = document.createElement("section");
  content.setAttribute("id", "todolist");
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
  const ul = document.createElement("ul");
  list.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.description}`;
    ul.appendChild(li);
  });
  return ul;
}

function getProjects() {
  let projects = newTask.getProjects();
  const ul = document.createElement("ul");
  ul.classList.add('projectlist')
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
    const h2 = document.createElement('h2')
    h2.textContent = element
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
      content.appendChild(todolist(item.dataset.project));
    });
  });
}

function setMenuListener(){
    
}

export default function init() {
  let main = document.querySelector("#content");
  main.innerHTML = "";
  main.appendChild(asidenav());
  main.appendChild(component(todolist()));
  setProjectListener();
}
