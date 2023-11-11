const HEADERS =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'crossorigin': 'anonymous',
}

const url = 'http://ec2-52-91-108-232.compute-1.amazonaws.com';

export const confirmEmail = (token: string) => {
  const options = {
    method: 'GET',
    headers: HEADERS,
  }

  try {
    fetch(url + `/auth/confirm?token=${token}`, options)
    .then(response => response)
  } catch(error) {
    console.log(error)
  }
}