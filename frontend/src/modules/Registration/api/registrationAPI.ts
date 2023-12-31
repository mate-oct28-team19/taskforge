import { translator } from "../../../translator";
import { Lang } from "../../../types/Lang";
import { settings } from "../../settings";

const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

type User = {
  email: string,
  password: string,
  repeatPassword: string,
  colorScheme: 'LIGHT' | 'DARK',
  language: 'ENGLISH' | 'UKRAINIAN' | 'POLISH'
}

export const registrateUser = async (
  data: User,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  setConfirmCodeFromServer: React.Dispatch<React.SetStateAction<string>>,
  setUserAlreadyRegistered: React.Dispatch<React.SetStateAction<boolean>>,
  setModalWinIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  lang: Lang,
) => {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(settings.BACKEND_URL + '/auth/register', options);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const responseData = await response.json();

    setToken(responseData.token);
    setConfirmCodeFromServer(responseData.code);
    setModalWinIsOpened(true);

  } catch (error) {
    setUserAlreadyRegistered(true);
    const email_temp = email;
    setEmail(translator[lang].registration.emailAlreadyTaken);

    setTimeout(() => {
      setEmail(email_temp);
      setUserAlreadyRegistered(false);
    }, 3000);
  }
}