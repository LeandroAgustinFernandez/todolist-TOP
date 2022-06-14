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
    console.log(JSON.parse(localStorage.getItem("todolist")));
  };

  const getTaskList = () => {
    let taskList = JSON.parse(localStorage.getItem("todolist"));
    return taskList;
  };

  const newTask = () => {
    let taskElement = {
      title: this.__title,
      description: this.__description,
      date: this.__date,
      project:this.__project,
      priority: this.__priority,
    };
    return taskElement;
  };

  const init = (
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

  return {
    init,
    getTaskList,
  };
};

module.exports = task;
