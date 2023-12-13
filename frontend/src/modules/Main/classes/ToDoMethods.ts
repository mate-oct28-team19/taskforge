import { Status } from "../types/Status";
import { Task } from "../types/Task";
import { Todo } from "../types/Todo";

export class ToDoMethods {
  public static convertTodos (todos: Todo[]) {
    const tasksToDo: Task[] = [];
    const tasksInProcess: Task[] = [];
    const tasksDone: Task[] = [];

    const convertedTasks = [
      { board_id: 1, board_title: 'To Do', items: [] as Task[] },
      { board_id: 2, board_title: 'In Process', items: [] as Task[] },
      { board_id: 3, board_title: 'Done', items: [] as Task[] }
    ]

    todos.forEach((todo: Todo) => {
      const task = { id: todo.id, title: todo.title }

      switch (todo.status) {
        case Status.TODO:
          tasksToDo.push(task);
          break;
        case Status.IN_PROCESS:
          tasksInProcess.push(task);
          break;
        case Status.DONE:
          tasksDone.push(task);
          break;
      }
    });

    convertedTasks[0].items = tasksToDo;
    convertedTasks[1].items = tasksInProcess;
    convertedTasks[2].items = tasksDone;

    return convertedTasks;
  }
};
