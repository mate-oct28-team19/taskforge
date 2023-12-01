import { Lang } from "../../../types/Lang";

export const switchLangAPI = async ( choosenLang: Lang, token: string ) => {
  const HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
  
  const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

  const options = {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ "colorScheme": choosenLang }),
  }

  try {
    const response = await fetch(url + `/users/language`, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

  } catch(error) {
    console.log(error);
  }
} 