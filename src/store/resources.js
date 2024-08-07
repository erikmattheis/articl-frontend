export default {
  namespaced: true,

  state: () => ({
    lastPath: "",
    slug: 0,
    articlType: "",
    articls: [],
    articlTypes: [],
    currentArticlType: "",
    categories: [],
    notes: [],
    QAndAs: [],
    treeLevel: 0,
    breadcrumbs: [],
    count: 0,
  }),

  mutations: {
    SET_LAST_PATH: (state, payload) => {
      state.lastPath = payload;
    },
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
    lastPath: (context, payload) => {
      context.commit("SET_LAST_PATH", payload);
    },
    slug: (context, payload) => {
      context.commit("SET_SLUG", payload);
    },
    articlType: (context, payload) => {
    context.commit("SET_ARTICL_TYPE", payload); // Set articl type in state
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
   sortArticlsByAnyKey: (context, { articlType, key }) => {
    const articls = context.state.articls.slice(); // Create a shallow copy of the original array
    articls.sort((a, b) => {
      if (key === "year" || key === "createdAt") {
        return b[key] - a[key];
      } else {
        return a[key].localeCompare(b[key]);
      }
    });
    context.commit("SET_ARTICLS", articls);
  },
  },
  getters: {

    lastPath: (state) => state.lastPath,

    slug: (state) => state.slug,

    articlType: (state) => state.articlType,

    count: (state) => state.count,

    categories: (state) => state.categories,

 filteredArticls: (state) => (articlType, sortBy) => {
    let articls = articlType ? state.articls.filter(articl => articl.articlType === articlType) : state.articls;
    if (sortBy) {
      articls.sort((a, b) => {
        if (sortBy === "year" || sortBy === "createdAt") {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy].localeCompare(b[sortBy]);
        }
      });
    }
    return articls;
  },

    articlTypes: (state) => [...new Set(state.articls.map(articl => articl.resourceType))] || [],

    initialArticlType: (state, getters) => getters.articlTypes[0],

    QAndAs: (state) => state.QAndAs,

    notes: (state) => state.notes,

    treeLevel: (state) => state.breadcrumbs.length,

    breadcrumbs: (state) => state.breadcrumbs,

  },
};
