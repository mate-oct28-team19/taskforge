import { Lang } from "../../../types/Lang";
import { settings } from "../../settings";

export const switchLangAPI = async ( choosenLang: Lang, token: string ) => {
  const HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const options = {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ "language": choosenLang }),
  }

  try {
    const response = await fetch(settings.BACKEND_URL + `/users/language`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

  } catch(error) {
    console.log(error);
  }
} 