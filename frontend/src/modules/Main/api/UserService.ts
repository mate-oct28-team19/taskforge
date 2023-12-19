import { settings } from "../../settings";

enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export class UserService {
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
    body?: { newPassword: string }
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

  public static async changePassword(token: string, newPassword: string) {
    const body = { newPassword }
    const OPTIONS = this.getOptions(token, HTTP_METHOD.PATCH, body);
    
    try {
      const response = await fetch(settings.BACKEND_URL + `/users/password`, OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

    } catch(error) {
      console.log(error);
    }
  }

  public static async deleteAccount(token: string) {
    const OPTIONS = this.getOptions(token, HTTP_METHOD.DELETE);
    
    try {
      const response = await fetch(settings.BACKEND_URL + `/users`, OPTIONS);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

    } catch(error) {
      console.log(error);
    }
  }
}