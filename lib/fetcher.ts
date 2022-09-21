export default function fetcher(url: string, data?: any) {
  const method = data ? "POST" : "GET";
  return fetch(`/api/${url}`, {
    method,
    credentials: "include",

    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 || res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
}
