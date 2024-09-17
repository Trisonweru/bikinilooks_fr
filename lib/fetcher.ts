export default async function fetcher(url: string, data?: any) {
  const resp = await fetch(url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await resp.json();
  return res;
}
