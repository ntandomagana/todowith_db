import { deleteAllTasks, deleteTask } from "../controllers/ApiFront.js";
import { addTask_, arr, editTaskText, taskDone_ } from "../controllers/functionality.js";

displayExistingTasks();

function addTask() {
  var task = document.getElementById("input-box");

  if (task.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const taskObject = addTask_(task);
  reloadFunct();

  var input = document.getElementById("myTodolist");
  var divTag = document.createElement("div");
  var singleTask = document.createElement("li");
  var deleteButton = document.createElement("button");
  var editbutton = document.createElement("button");
  var divButton = document.createElement("div");

  deleteButton.className = "delete";
  editbutton.className = "edit";
  divButton.className = "buttons";
  divTag.className = "taskList";

  deleteButton.innerHTML = "Delete";
  editbutton.innerHTML = "Edit";

  divTag.appendChild(singleTask);
  divTag.appendChild(divButton);
  divButton.appendChild(deleteButton);
  divButton.appendChild(editbutton);

  singleTask.innerHTML = taskObject.task;
  input.appendChild(divTag);

  deleteButton.onclick = function () {
    let deletequestion = confirm (`Are you sure you want to delete this task?. `);
    if (deletequestion) {
      deleteTask(taskObject.id);
      location.reload();
    } else {
      return;
    }
  };

  editbutton.onclick = function () {
    editTaskText(taskObject);
    location.reload();
  };
  singleTask.onclick = function () {
    taskDone(singleTask, taskObject);
  };

  task.value = "";
  // location.reload();
}

async function displayExistingTasks() {
  var input = document.getElementById("myTodolist");
  input.innerHTML = ""; // Clear the list to avoid duplication

  if ((await arr) != undefined) {
    arr.forEach((taskValue, index) => {
      var divTag = document.createElement("div");
      var singleTask = document.createElement("li");
      var deleteButton = document.createElement("button");
      var editbutton = document.createElement("button");
      var divButton = document.createElement("div");

      deleteButton.className = "delete";
      editbutton.className = "edit";
      divButton.className = "buttons";
      divTag.className = "taskList";

      deleteButton.innerHTML = "Delete";
      editbutton.innerHTML = "Edit";

      divTag.appendChild(singleTask);
      divTag.appendChild(divButton);
      divButton.appendChild(deleteButton);
      divButton.appendChild(editbutton);

      singleTask.innerHTML = taskValue.task;

      displayWithLine(singleTask, taskValue.isdone);

      input.appendChild(divTag);

      deleteButton.onclick = function () {
        let deletequestion = confirm(
          `Are you sure you want to delete this task? `
        );
        if (deletequestion) {
          deleteTask(taskValue.id);
          location.reload();
        } else {
          return;
        }
      };

      editbutton.onclick = function () {
        editTaskText(taskValue);
        location.reload();
      };

      singleTask.onclick = function () {
        taskDone(singleTask, taskValue);
      };
    });
  }
  // location.reload();
}

function clearAll() {
  const confirmClear = confirm(
    "Are you sure you want to clear all tasks?"
  );
  if (confirmClear) {
    deleteAllTasks();
  }
  location.reload();
}

function taskDone(taskElement, taskValue) {
  let done;
  let redo;

  if (!taskValue.isdone) {
    done = confirm(`Are you sure you are done with ${taskValue.task}?`);
  } else if (taskValue.isdone) {
    redo = confirm(`Are you sure you want to redo ${taskValue.task}?`);
  }
  if (done || redo) {
    taskDone_(taskValue);
  }
  displayWithLine(taskElement, done);
  location.reload();
}

function displayWithLine(taskElement, done) {
  if (done) {
    taskElement.style.textDecoration = "line-through";
    taskElement.style.color = "gray";
  } else {
    taskElement.style.textDecoration = "none";
    taskElement.style.color = "black";
  }
}

function reloadFunct() {
  location.reload();
  // return;
}

globalThis.addTask = addTask;
globalThis.clearAll = clearAll;
// window.addTask = addTask;
// window.clearAll = clearAll;

export default { arr };
