const task = () => {
  const datefns = require("date-fns");
  const { nanoid } = require("nanoid");

  let __id;
  let __title;
  let __description;
  let __date;
  let __priority;
  let __project;
  let __check;

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

  const getTaskList = (category = null, data = null) => {
    let taskList = JSON.parse(localStorage.getItem("todolist"));
    if (data == "inbox") return taskList;
    if (data == "today") {
      let date = new Intl.DateTimeFormat("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      taskList = taskList.filter((task) => {
        if (task.date == date) {
          return task.date;
        }
      });
    }
    if (data == "this week") {
      taskList = taskList.filter((task) => {
        if (datefns.isThisWeek(new Date(task.date))) {
          return task.date;
        }
      });
    }
    if (category != null) {
      taskList = taskList.filter((task) => {
        if (task.project == category) {
          return task.project;
        }
      });
    }
    return taskList;
  };

  const newTask = () => {
    let taskElement = {
      id: this.__id,
      title: this.__title,
      description: this.__description,
      date: this.__date,
      project: this.__project,
      priority: this.__priority,
      check: this.__check,
    };
    return taskElement;
  };

  const createTask = (
    title,
    description,
    date = null,
    project = null,
    priority = null,
    check = null
  ) => {
    this.__id = nanoid(10);
    this.__title = title;
    this.__description = description;
    this.__date = date;
    this.__priority = priority;
    this.__project = project;
    this.__check = check;
    addTask(newTask());
  };

  const delTask = (id) => {
    let taskList = getTaskList();
    taskList.forEach((taskItem) => {
      if (taskItem.id == id) {
        taskList.splice(taskList.indexOf(taskItem), 1);
      }
    });
    localStorage.setItem("todolist", JSON.stringify(taskList));
  };

  const updateTask = (task) => {
    let taskList = getTaskList();
    if (task.id != null) {
      taskList.forEach((taskItem) => {
        if (taskItem.id == task.id) {
          taskList[taskList.indexOf(taskItem)] = task;
        }
      });
      localStorage.setItem("todolist", JSON.stringify(taskList));
    } else {
      createTask(task.title, task.description, task.date, task.project);
    }
  };

  const getTask = (index) => {
    let taskList = getTaskList();
    let taskElement = taskList[index];
    taskElement.id = index;
    return taskElement;
  };

  const getProjects = () => {
    if (getTaskList() != null) {
      let taskList = getTaskList();
      let projects = taskList
        .filter((task) => {
          if (task.project != "") {
            return task.project;
          }
        })
        .map((task) => task.project);
      return new Set(projects);
    } else {
      return null;
    }
  };

  const setTaskStatus = (id) => {
    let taskList = getTaskList();
    taskList.forEach((taskItem) => {
      if (taskItem.id == id) {
        taskItem.check = taskItem.check ? null : 1;
      }
    });
    localStorage.setItem("todolist", JSON.stringify(taskList));
  };

  return {
    createTask,
    getTaskList,
    delTask,
    getTask,
    updateTask,
    getProjects,
    setTaskStatus,
  };
};

module.exports = task;
