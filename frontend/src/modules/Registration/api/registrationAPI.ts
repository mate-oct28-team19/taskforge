const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'crossorigin': 'anonymous',
}

const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

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
  email: string
) => {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url + '/auth/register', options);

    if (response.status === 409) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const responseData = await response.json();

    setToken(responseData.token);
    setConfirmCodeFromServer(responseData.code);
    setModalWinIsOpened(true);
    // console.log(responseData);

  } catch (error) {
    setUserAlreadyRegistered(true);
    const email_temp = email;
    setEmail('Email already taken')

    setTimeout(() => {
      setEmail(email_temp);
      setUserAlreadyRegistered(false);
    }, 3000);
  }
}