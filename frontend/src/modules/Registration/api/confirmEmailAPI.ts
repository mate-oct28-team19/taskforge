import { settings } from "../../settings";

const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const confirmEmail = async (
    token: string,
    emailIsConfirmed: boolean,
    setEmailIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
    setAuth: (auth: boolean) => void
  ) => {
  const options = {
    method: 'GET',
    headers: HEADERS,
  }

  if (!emailIsConfirmed) {
    try {
      const response = await fetch(settings.BACKEND_URL + `/auth/confirm?token=${token}`, options);
  
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
  
      setAuth(true);
      setEmailIsConfirmed(true);
    } catch(error) {
      console.log(error);
    }
  }
}