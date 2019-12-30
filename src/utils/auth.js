import Cookie from "js-cookie";

export const setToken = user => {
  if (process.SERVER_BUILD) return;
  const string_user = JSON.stringify(user);
  window.localStorage.setItem("user", string_user);
  Cookie.set("jwt", string_user);
};

export const unsetToken = () => {
  if (process.SERVER_BUILD) return;
  window.localStorage.removeItem("user");
  Cookie.remove("jwt");
  window.localStorage.setItem("logout", Date.now());
};

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return;
  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) return;
  const jwt = jwtCookie.split("=")[1];
  return JSON.parse(decodeURIComponent(jwt));
};

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};
