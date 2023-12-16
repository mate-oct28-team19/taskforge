import { Lang } from "../../../types/Lang";
import { Theme } from "../../../types/Theme";
import { settings } from "../../settings";

const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

type UserLogin = {
  email: string,
  password: string,
}

export const loginUser = async (
  data: UserLogin,
  callback: (token: string, lang: Lang, theme: Theme) => void,
  incorrectPasswordHandler: () => void,
) => {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(settings.BACKEND_URL + '/auth/login', options);

    if (response.status === 403) {
      incorrectPasswordHandler();
      return;
    }

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const responseData = await response.json();

    callback(responseData.token, responseData.language, responseData.colorScheme);
  } catch (error) {}
}