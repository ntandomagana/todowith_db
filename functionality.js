const arr = [];

// function addTask(task) {
//   var index = arr.length - 1;
//   var taskValue = task.value;
//   if (taskValue === "" || !taskValue.trim()) {
//     alert("Please enter a task");
//     return;
//   }

//   arr.push(taskValue);
// }
function addTask(arr, task) {
  // Check if the task is empty after trimming whitespace
  if (!task || !task.trim()) {
    alert("Please enter a task");
    return;
  }

  // Add the task to the array
  arr.push(task.trim());
}

function deleteTask(arr, index) {
  // arr.splice(index, 1);
  if (index >= 0 && index < arr.length) {
    arr.splice(index, 1);
  } else {
    alert("Index out of bounds");
  }
}

// function editTask(index, newTaskValue) {
//   // var newTaskValue = prompt("Edit your task:", arr[index]);
//   if (newTaskValue !== null && newTaskValue.trim() !== "") {
//     arr[index] = newTaskValue;
//     // taskElement.innerHTML = newTaskValue;
//     // addToStorage();
//   }
// }

function editTask(arr, index, newTaskValue) {
  if (
    newTaskValue !== null &&
    newTaskValue.trim() !== "" &&
    index >= 0 &&
    index < arr.length
  ) {
    arr[index] = newTaskValue.trim();
  }
}

function taskDone(index, taskElement) {
  taskElement.style.textDecoration = "line-through";
  taskElement.style.color = "gray";
}

export { arr, addTask, deleteTask, editTask };
