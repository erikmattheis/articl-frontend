export default {
  namespaced: true,

  state: () => ({
    slug: "",
    articlType: "",
    articls: [],
    articlTypes: [],
    currentArticlType: "",
    categories: [],
    notes: [],
    QAndAs: [],
    treeLevel: undefined,
    breadcrumbs: [],
    count: 0,
  }),

  mutations: {
    SET_SLUG: (state, payload) => {
      state.slug = payload;
    },
    SET_ARTICL_TYPE: (state, payload) => {
      state.articlType = payload;
    },
    SET_COUNT: (state, payload) => {
      state.count = payload;
    },
    SET_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SET_ARTICLS: (state, payload) => {
      state.articls = payload;
    },
    SET_ARTICL_TYPES: (state, payload) => {
      state.articlTypes = payload;
    },
    SET_INITIAL_ARTICL_TYPE: (state, payload) => {
      state.initialArticlType = payload;
    },
    SET_CURRENT_ARTICL_TYPE: (state, payload) => {
      state.currentArticlType = payload;
    },
    SET_NOTES: (state, payload) => {
      state.notes = payload;
    },
    SET_BREADCRUMBS: (state, payload) => {
      state.breadcrumbs = payload;
    },
  },

  actions: {
    slug: (context, payload) => {
      context.commit("SET_SLUG", payload);
    },
    articlType: (context, payload) => {
      context.commit("SET_ARTICL_TYPE", payload);
    },
    count: (context, payload) => {
      context.commit("SET_COUNT", payload);
    },
    categories: (context, payload) => {
      context.commit("SET_CATEGORIES", payload);
    },
    articls: (context, payload) => {
      context.commit("SET_ARTICLS", payload);
    },
    articlTypes: (context, payload) => {
      context.commit("SET_ARTICL_TYPES", payload);
    },
    initialArticlType: (context, payload) => {
      context.commit("SET_INITIAL_ARTICL_TYPE", payload);
    },
    notes: (context, payload) => {
      context.commit("SET_NOTES", payload);
    },
    setNote({ commit, state }, payload) {
      const newNotes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return { ...note, ...payload };
        } else {
          return note;
        }
      });
      commit("SET_NOTES", newNotes);
    },
    addNote: (context, payload) => {
      const { notes } = context.state;
      const newNotes = notes.unshift(payload);
      context.commit("SET_NOTES", newNotes);
    },
    breadcrumbs: (context, payload) => {
      context.commit("SET_BREADCRUMBS", payload);
    },
    removeNote: (context, payload) => {
      const { notes } = context.state;
      const newNotes = notes.filter((note) => note.id !== payload);
      context.commit("SET_NOTES", newNotes);
    },
    sortArticlsByAnyKey: (state) => (key) => {  
      
      const articls = state.articls.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        }
        if (a[key] < b[key]) {
          return -1;
        }
        return 0;
      });

      context.commit("SET_ARTICLS", articls);
    },
  },
  getters: {

    slug: (state) => state.slug,

    articlType: (state) => state.articlType,

    count: (state) => state.count,

    categories: (state) => state.categories,



    filteredArticls: (state) => (articlType) => {
      if (!articlType) {
        return state.articls;
      }
      return state.articls.filter((articl) => articl.articlType === articlType);
    },

    articlTypes: (state) => [...new Set(state.articls.map(articl => articl.articlType))] || [],

    initialArticlType: (state, getters) => getters.articlTypes[0],

    QAndAs: (state) => state.QAndAs,

    notes: (state) => state.notes,

    treeLevel: (state) => state.breadcrumbs.length,

    breadcrumbs: (state) => state.breadcrumbs,

  },
};
