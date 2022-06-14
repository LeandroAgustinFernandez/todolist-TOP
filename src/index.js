import "./styles.css";
import task from "./task";


localStorage.clear()
const newTask = task()
newTask.init('Tarea de prueba','Probando la tarea','01/01/2023','dePrueba')
function component() {
    const content = document.createElement('div')
    content.appendChild(todolist())
    return content
}

function todolist(){
    let list = newTask.getTaskList() || [];
    const ul = document.createElement('ul')
    list.forEach(task => {
        const li = document.createElement('li')
        li.textContent = `${task.title} - ${task.description}`;
        ul.appendChild(li);
    });
    return ul;
}

document.querySelector('#content').appendChild(component())
// console.log(localStorage.getItem('todolist'))
// localStorage.setItem('todolist',JSON.stringify(task))

// let prueba = JSON.parse(localStorage.getItem('todolist'));

// for (const task of prueba) {
//     console.log(`ID: ${task.id} name: ${task.name}`);    
// }