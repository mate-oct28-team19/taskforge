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

type ResponseFromServer = {
  code: number;
  colorScheme: 'LIGHT' | 'DARK';
  language: 'ENGLISH' | 'UKRAINIAN' | 'POLISH';
  token: string;
}

export const registrateUser = (
  data: User,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  setConfirmCodeFromServer: React.Dispatch<React.SetStateAction<string>>,
) => {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  }

  try {
    fetch(url + '/auth/register', options)
    .then(response => response.json())
    .then(data => {
      setToken(data.token);
      setConfirmCodeFromServer(data.code)
    });
  } catch(error) {
    console.log(error)
  }
}