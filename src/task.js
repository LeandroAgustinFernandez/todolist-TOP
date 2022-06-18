const task = () => {
  let __title;
  let __description;
  let __date;
  let __priority;
  let __project;

  const addTask = (task) => {
    if (localStorage.getItem("todolist") == null) {
      createStorage(false, task);
    } else {
      createStorage(true, task);
    }
  };

  const createStorage = (isCreated, task) => {
    let taskList = [];
    if (isCreated) {
      taskList = getTaskList();
    }
    taskList.push(task);
    localStorage.setItem("todolist", JSON.stringify(taskList));
  };

  const getTaskList = (category = null) => {
    let taskList = JSON.parse(localStorage.getItem("todolist"));
    if (category != null) {
      taskList = taskList.filter(task=>{
        if (task.project == category) {
          return task.project;
        }
      })
    }
    return taskList;
  };

  const newTask = () => {
    let taskElement = {
      title: this.__title,
      description: this.__description,
      date: this.__date,
      project: this.__project,
      priority: this.__priority,
    };
    return taskElement;
  };

  const createTask = (
    title,
    description,
    date = null,
    project = null,
    priority = null
  ) => {
    this.__title = title;
    this.__description = description;
    this.__date = date;
    this.__priority = priority;
    this.__project = project;
    addTask(newTask());
  };

  const delTask = (id) => {
    let taskList = getTaskList();
    taskList.splice(id, 1);
    localStorage.setItem("todolist", JSON.stringify(taskList));
  };

  const updateTask = (task) => {
    let taskList = getTaskList();
    let index = task.id;
    delete task.id;
    taskList[index] = task;
    localStorage.setItem("todolist", JSON.stringify(taskList));
  };

  const getTask = (index) => {
    let taskList = getTaskList();
    let taskElement = taskList[index];
    taskElement.id = index;
    return taskElement;
  };

  const getProjects = () => {
    let taskList = getTaskList();
    let projects = taskList
      .filter((task) => {
        if (task.project != "") {
          return task.project;
        }
      })
      .map((task) => task.project);
    return new Set(projects);
  };

  return {
    createTask,
    getTaskList,
    delTask,
    getTask,
    updateTask,
    getProjects,
  };
};

module.exports = task;
