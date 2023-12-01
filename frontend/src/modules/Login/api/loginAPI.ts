import { Lang } from "../../../types/Lang";
import { Theme } from "../../../types/Theme";

const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

type UserLogin = {
  email: string,
  password: string,
}

export const loginUser = async (
  data: UserLogin,
  callback: (token: string, lang: Lang, theme: Theme) => void
) => {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url + '/auth/login', options);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const responseData = await response.json();

    callback(responseData.token, responseData.language, responseData.colorScheme)

  } catch (error) {
    console.log(error);
  }
}