import { getTasks, sendTask, updateTask } from "./ApiFront.js";


const arr = (await populateArray()) || [];

async function populateArray() {
  const tasks = await getTasks();
  return Array.from(tasks);
}

function addTask_(task) {
  let taskValue = task.value;

  let taskObject = {
    id: arr.length,
    task: taskValue,
    isdone: false,
  };

  sendTask(taskObject);
  arr.push(taskObject);
  return taskObject;
}

function editTaskText(taskObject) {


 let newTaskValue = prompt("Edit your task:", taskObject.task);

  if (newTaskValue !== null && newTaskValue.trim() !== "") {
    let newObject = {
      id: taskObject.id,
      task: newTaskValue,
      isdone: taskObject.isdone,
    };
    updateTask(newObject);
  }
}

async function taskDone_(taskObject) {
  console.log(taskObject);
  taskObject.isdone = !taskObject.isdone;
  console.log(taskObject);
  await updateTask(taskObject);
}

export { addTask_, arr, editTaskText, populateArray, taskDone_ };
