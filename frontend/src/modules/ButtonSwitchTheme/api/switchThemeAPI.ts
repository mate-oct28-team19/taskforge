import { Theme } from "../../../types/Theme";
import { settings } from "../../settings";

export const switchThemeAPI = async ( theme: Theme, token: string ) => {
  const HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const options = {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ "colorScheme": theme }),
  }

  try {
    const response = await fetch(settings.BACKEND_URL + `/users/color_scheme`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

  } catch(error) {
    console.log(error);
  }
} 