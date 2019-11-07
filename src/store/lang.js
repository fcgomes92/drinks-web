export const state = () => ({
  lang: "en"
});

export const mutations = {
  change(state, { lang }) {
    return (state.lang = lang);
  }
};
