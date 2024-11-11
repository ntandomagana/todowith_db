import { jest } from "@jest/globals";
import { arr, addTask_, taskDone_,editTaskText } from "../controllers/functionality.js";
import http from "http";
import { sendTask, deleteAllTasks } from "../controllers/ApiFront.js";

// jest.unstable_mockModule("../controllers/functionality.js", () => ({
//   sendTask: jest.fn(),
// }));



  describe("[arr] Testing array of tasks", () => {
    afterEach(() => {
      arr.length = 0;
      deleteAllTasks();
    })
  // });

  test("[arr] array should be defined", () => {
    expect(arr).toBeDefined();
  });

  test("[arr] testing array content/length to be zero", () => {
    expect(arr.length).toEqual(0);
  });

  test("[arr] checking type of array", () => {
    expect(Array.isArray(arr)).toEqual(true);
  });
});

describe("[addTask]", () => {
  // let taskObject = {
  //   id: arr.length,
  //   task: "new Task ",
  //   isdone: false,
  // };
  const taskValue = "new Task";

  test("Array should have one element", () => {
    expect(addTask_).toBeDefined();
    expect( typeof addTask_).toEqual("function");
    // sendTask.unstable_mockModule("");
    addTaskText(taskValue);
    expect(arr.length).toEqual(1);
  });
});

// describe("[deleteTask]", () => {
//   test("Array should have zero element", () => {
//     let taskObject = {
//       id: arr.length,
//       task: "new Task ",
//       isdone: false,
//     };
//     // const taskValue = "new Task";
//     addTask_(taskObject.task);

//     deleteTask_(0, taskValue);
//     expect(arr.length).toEqual(0);
//   });

// });

 describe("[editTask]", () => {
  beforeAll(() => {
    global.prompt = jest.fn();
    global.alert = jest.fn();
  });

   beforeEach(() => {
     arr.length = 0;
    //  deleteAllTasks();
     global.prompt = jest.fn();
   });
  
  // afterEach(() => {
  //   arr.length = 0;
  //   deleteAllTasks();
  // });

  

//   test("Array should have an updated element", () => {
//     let task = "new Task";

//     console.log(task);

//     let myTask = addTask_(task);

//     console.log(arr);
//     console.log(prompt);
//     editTaskText(myTask);
    
//     expect(arr[0].task).toEqual("Alice");
//   });
// });

 test("should show alert for invalid name and prompt again", () => {
  let task = "new Task";
  // prompt
  //   .mockReturnValueOnce("John");

  const result = addTask_(task);
   editTaskText(result);
  console.log(arr);
  expect(arr[0].task).toBe("John");
});

// describe("[taskDone]", () => {
//   test("Array should element be updated to isDone", () => {
//     const taskValue = "new Task";

//     addTask_(taskValue);
//     taskDone_(0);
//     // expect(isDone_()).toBeDefined();
//     expect(arr[0].isDone).toEqual(true);
//   });
});
