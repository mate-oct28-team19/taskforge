import { settings } from "../../settings";
import { ToDoMethods } from "../classes/ToDoMethods";
import { Board } from "../types/Board";
import { Todo } from "../types/Todo";

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export class TodoService {
  private static getHeaders(token: string) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  private static getOptions(
    token: string,
    method: HTTP_METHOD,
    body?: Object,
  ) {
    const options = {
      method,
      headers: this.getHeaders(token),
    }

    if (body) {
      return { ...options, body: JSON.stringify(body)}
    }

    return options;
  }

  public static async get(
    token: string,
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>,
    setAuth: (auth: boolean) => void,
    setToken: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.GET);
    
    try {
      const response = await fetch(settings.BACKEND_URL + '/tasks', OPTIONS);

      if (response.status === 403) {
        setAuth(false);
        setToken('');
        localStorage.setItem('taskforge-token', '');
      }

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      setBoards(ToDoMethods.convertTodos(data))
    } catch(error: any) {
      if (error.name === "NS_ERROR_DOM_BAD_URI") {
        setAuth(false);
        setToken('');
        localStorage.setItem('taskforge-token', '');
      }
    }
  }

  public static async post(
    token: string,
    newTodo: { title: string },
    addToDoLocal: (createdTodo: Omit<Todo, 'status'>) => void,
    setAuth: (auth: boolean) => void,
    setToken: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.POST, newTodo);

    try {
      const response = await fetch(settings.BACKEND_URL + '/tasks', OPTIONS);

      if (response.status === 403) {
        setAuth(false);
        setToken('');
        localStorage.setItem('taskforge-token', '');
      }

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const createdTodo: Todo = await response.json();
      const { id, title } = createdTodo;
      addToDoLocal({ id, title });
    } catch(error) {
      console.log(error)
    }
  }

  public static async put(
    token: string,
    updatedTodo: Todo,
    setAuth: (auth: boolean) => void,
    setToken: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.PUT, updatedTodo);

    try {
      const response = await fetch(settings.BACKEND_URL + `/tasks/${updatedTodo.id}`, OPTIONS);

      if (response.status === 403) {
        setAuth(false);
        setToken('');
        localStorage.setItem('taskforge-token', '');
      }

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return await response.json();
    } catch(error) {
      console.log(error)
    }
  }

  public static async delete(
    token: string,
    id: Todo['id'],
    deleteTodoLocal: (todoId: Todo['id']) => void,
    setAuth: (auth: boolean) => void,
    setToken: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.DELETE);

    try {
      const response = await fetch(settings.BACKEND_URL + `/tasks/${id}`, OPTIONS);
      
      if (response.status === 403) {
        setAuth(false);
        setToken('');
        localStorage.setItem('taskforge-token', '');
      }

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      deleteTodoLocal(id);
    } catch(error) {
      console.log(error)
    }
  }
};
