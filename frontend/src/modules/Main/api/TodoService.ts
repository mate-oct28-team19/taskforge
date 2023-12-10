import { settings } from "../../settings";
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

  public static async get(token: string) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.GET);
    
    try {
      const response = await fetch(settings.BACKEND_URL + '/tasks', OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
    } catch(error) {
      console.log(error);
    }
  }

  public static async post(token: string, newTodo: Todo) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.POST, newTodo);

    try {
      const response = await fetch(settings.BACKEND_URL + '/tasks', OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
    } catch(error) {
      console.log(error)
    }
  }

  public static async put(token: string, updatedTodo: Todo, id: Todo['id']) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.PUT, updatedTodo);

    try {
      const response = await fetch(settings.BACKEND_URL + `/tasks/${id}`, OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
    } catch(error) {
      console.log(error)
    }
  }

  public static async delete(token: string, id: Todo['id']) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.DELETE);

    try {
      const response = await fetch(settings.BACKEND_URL + `/tasks/${id}`, OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
    } catch(error) {
      console.log(error)
    }
  }
}
