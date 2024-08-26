export const fetcher = async (url: string, data?: any) => {
  const resp = await fetch(url, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  console.log("resp",resp)
  const res = await resp.json()
  return res
}


export function getToken() {
  return localStorage.getItem('token');
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
   localStorage.removeItem('user');
}