export const state = () => ({
  idToken: null,
  user: {},
  loggedIn: false
});

export const mutations = {
  login(state, { user, idToken }) {
    state = { ...state, ...{ user, idToken, loggedIn: true } };
  },
  logout(state) {
    state = { ...state, ...{ user: {}, idToken: null, loggedIn: false } };
  }
};
