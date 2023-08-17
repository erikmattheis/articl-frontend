import { login as userLogin, logout as userLogout } from "../services/userService";
import { convertStringDatesToMS } from "../services/stringsService";

export default {
  namespaced: true,

  state: () => ({
    isEmailVerified: undefined,
    user: undefined,
    logInError: undefined,
  }),

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },

    SET_LOG_IN_ERROR(state, error) {
      state.logInError = `Login error: ${error}`;
    },
  },

  actions: {
    setUser: (context, payload) => {
      const user = JSON.stringify(payload);
      context.commit("SET_USER", user);
    },

    async login({ dispatch, commit }, { username, password }) {
      try {
        const response = await userLogin({ username, password });

        const { data } = response;

        if (data.error) {
          commit("SET_LOG_IN_ERROR", data.error);
          return false;
        }
        const tokens = convertStringDatesToMS(data.tokens);
        dispatch("tokens/setTokens", tokens, { root: true });
        commit("SET_USER", data.user);
        return true;
      } catch (error) {
        console.error("login error:", error)
        commit("SET_LOG_IN_ERROR", error);
      }
    },

    clearLogInError({ commit }) {
        commit("SET_LOG_IN_ERROR", "");
    },
    
    async logout({ dispatch, commit, rootGetters }) {
      try {
        const accessToken = rootGetters["tokens/accessTokenValue"];
        dispatch("tokens/clearTokens", { rememberMe: true }, { root: true });
        commit("CLEAR_USER");
        await userLogout({ accessToken });
      } catch (error) {
        dispatch("errors/setError", error, { root: true });
      }
    },
  },

  getters: {

    isEmailVerified: (state) => state.isEmailVerified,

    user: (state) => state.user || {},

    id: (state) => state.id,

    username: (state) => state.username,

    logInError: (state) => state.logInError,

  },
};
