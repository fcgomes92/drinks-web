export const state = () => ({
  user: null,
  token: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user || null;
  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  }
};
