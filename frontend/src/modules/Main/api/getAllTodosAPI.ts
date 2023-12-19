import { settings } from "../../settings";
import { Todo } from "../types/Todo";

export const getAllTodosAPI = async (
  token: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  const HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const options = {
    method: 'GET',
    headers: HEADERS,
  }

  try {
    const response = await fetch(settings.BACKEND_URL + `/tasks`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    setTodos(data);

  } catch(error) {
    console.log(error);
  }
}