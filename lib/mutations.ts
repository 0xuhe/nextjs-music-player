import fetcher from "./fetcher";

export function auth(
  action: "signin" | "signup",
  data: { email: string; password: string }
) {
  return fetcher(action, data);
}
