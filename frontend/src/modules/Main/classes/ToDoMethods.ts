import { Board } from "../types/Board";
import { Status } from "../types/Status";
import { Task } from "../types/Task";
import { Todo } from "../types/Todo";

export class ToDoMethods {
  public static convertTodos (todos: Todo[]): Board[] {
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

  public static convertBoardsToTodos(boards: Board[]) {
    const copyBoards = [...boards];
    const tasksToDo: Todo[] = copyBoards[0].items.map(todo => ({ ...todo, status: Status.TODO }));
    const tasksInProcess: Todo[] = copyBoards[1].items.map(todo => ({ ...todo, status: Status.IN_PROCESS }));
    const tasksDone: Todo[] = copyBoards[2].items.map(todo => ({ ...todo, status: Status.DONE }));

    return [...tasksToDo, ...tasksInProcess, ...tasksDone];
  }

  public static findTodo (todoId: Todo['id'], boards: Board[]) {
    const allTasks = this.convertBoardsToTodos(boards);

    return allTasks.find(todo => todo.id === todoId);
  }

  public static updateTodoInBoards (updatedTodo: Todo, boards: Board[]) {
    const allTasks = this.convertBoardsToTodos(boards);
    const tasksToUpdatedTask = [ ...allTasks.slice(0, allTasks.findIndex(todo => todo.id === updatedTodo.id))];
    const tasksAfterUpdatedTask = [ ...allTasks.slice(allTasks.findIndex(todo => todo.id === updatedTodo.id) + 1)];
    const updatedTasks = [...tasksToUpdatedTask, updatedTodo, ...tasksAfterUpdatedTask];

    return updatedTasks;
  }
};
