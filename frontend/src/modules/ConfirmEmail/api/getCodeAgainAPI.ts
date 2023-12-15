import { settings } from "../../settings";

const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const getCodeAgain = async (
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setCode: React.Dispatch<React.SetStateAction<string>>,
  ) => {
  const options = {
    method: 'GET',
    headers: HEADERS,
  }

  try {
    const response = await fetch(settings.BACKEND_URL + `/auth/resend?token=${token}`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const responseData = await response.json();

    setToken(responseData.token);
    setCode(responseData.code);
  } catch(error) {
    console.log(error);
  }
}