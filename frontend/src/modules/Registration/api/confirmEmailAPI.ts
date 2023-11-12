const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'crossorigin': 'anonymous',
}

const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

export const confirmEmail = async (
    token: string,
    emailIsConfirmed: boolean,
    setEmailIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
  const options = {
    method: 'GET',
    headers: HEADERS,
  }

  if (!emailIsConfirmed) {
    try {
      const response = await fetch(url + `/auth/confirm?token=${token}`, options);
  
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
  
      setEmailIsConfirmed(true);
    } catch(error) {
      console.log(error);
    }
  }
}