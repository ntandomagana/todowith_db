import { arr, addTask, deleteTask, editTask } from "../functionality.js";
import jest from "jest";

describe("testing [arr] array", () => {
  test("array should be defined", () => {
    expect(arr).toBeDefined();
  });

  test("aray should be empty", () => {
    expect(arr.length).toBe(0);
  });

  test("add an item to the array", () => {
    const newItem = "newItem";

    arr.push(newItem);

    expect(arr.length).toBe(1);
    expect(arr[0]).toBe(newItem);
  });

  //   test("remove an item from the array", () => {
  //     const newItem = "newItem";

  //     arr.push(newItem);
  //     arr.pop();

  //     expect(arr.length).toEqual(0);
  //   });

  test("access an item by index in the array", () => {
    const newItem = "newItem";

    arr.push(newItem);

    expect(arr[0]).toBe(newItem);
  });
});

describe("testing [addTask] function", () => {
  test("add a valid task to the array", () => {
    const tasks = [];
    addTask(tasks, "New Task");
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toBe("New Task");
  });

  //   test("attempt to add an empty task", () => {
  //     const tasks = [];
  //     global.alert = jest.fn(); // Mock the alert function
  //     addTask(tasks, "");
  //     expect(tasks.length).toBe(0);
  //     expect(global.alert).toHaveBeenCalledWith("Task cannot be empty");
  //   });

  test("add multiple valid tasks", () => {
    const tasks = [];
    addTask(tasks, "Task 1");
    addTask(tasks, "Task 2");
    expect(tasks.length).toBe(2);
    expect(tasks).toEqual(["Task 1", "Task 2"]);
  });

  //   test("check for leading/trailing whitespace in task", () => {
  //     const tasks = [];
  //     global.alert = jest.fn(); // Mock the alert function
  //     addTask(tasks, "   ");
  //     expect(tasks.length).toBe(0);
  //     expect(global.alert).toHaveBeenCalledWith("Task cannot be empty");
  //   });

  test("add tasks with special characters", () => {
    const tasks = [];
    addTask(tasks, "@New_Task!#");
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toBe("@New_Task!#");
  });
});

describe("testing [deleteTask] function", () => {
  test("delete an item at a valid index", () => {
    const tasks = ["Task 1", "Task 2", "Task 3"];
    deleteTask(tasks, 1);
    expect(tasks).toEqual(["Task 1", "Task 3"]);
  });

  test("delete an item at the start of an array", () => {
    const tasks = ["Task 1", "Task 2", "Task 3"];
    deleteTask(tasks, 0);
    expect(tasks).toEqual(["Task 2", "Task 3"]);
  });

  test("delete an item at the end of an array", () => {
    const tasks = ["Task 1", "Task 2", "Task 3"];
    deleteTask(tasks, 2);
    expect(tasks).toEqual(["Task 1", "Task 2"]);
  });
});

describe("testing [editTask] function", () => {
  test("edit a task with a valid new value", () => {
    const arr = ["Task 1", "Task 2", "Task 3"];
    editTask(arr, 1, "Updated Task 2");
    expect(arr).toEqual(["Task 1", "Updated Task 2", "Task 3"]);
  });

  test("edit the first task in the array", () => {
    const arr = ["Task 1", "Task 2", "Task 3"];
    editTask(arr, 0, "Updated Task 1");
    expect(arr).toEqual(["Updated Task 1", "Task 2", "Task 3"]);
  });

  test("edit the last task in the array", () => {
    const arr = ["Task 1", "Task 2", "Task 3"];
    editTask(arr, 2, "Updated Task 3");
    expect(arr).toEqual(["Task 1", "Task 2", "Updated Task 3"]);
  });

  test("attempt to edit with an empty new value", () => {
    const arr = ["Task 1", "Task 2", "Task 3"];
    editTask(arr, 1, "");
    expect(arr).toEqual(["Task 1", "Task 2", "Task 3"]);
  });

  test("attempt to edit with a null new value", () => {
    const arr = ["Task 1", "Task 2", "Task 3"];
    editTask(arr, 1, null);
    expect(arr).toEqual(["Task 1", "Task 2", "Task 3"]);
  });
});
