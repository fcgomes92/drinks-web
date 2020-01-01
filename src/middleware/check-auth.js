import { getUserFromCookie, getUserFromLocalStorage } from "../utils/auth";

export default function({ store, req }) {
  // If nuxt generate, pass this middleware
  const loggedUser = req ? getUserFromCookie(req) : getUserFromLocalStorage();
  store.commit("auth/setUser", loggedUser);
}
