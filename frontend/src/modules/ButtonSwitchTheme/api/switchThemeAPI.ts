import { Theme } from "../../../types/Theme";

const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

export const switchThemeAPI = async ( theme: Theme, token: string ) => {
  const HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const options = {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ "colorScheme": theme }),
  }

  try {
    const response = await fetch(url + `/users/color_scheme`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

  } catch(error) {
    console.log(error);
  }
} 