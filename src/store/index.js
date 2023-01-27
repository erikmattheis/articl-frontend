import { createStore } from 'vuex';

import articlsParams from './articlsParams';
import categoryPages from './categoryPages';
import errors from './errors';
import metas from './metas';
import modals from './modals';
import tokens from './tokens';
import users from './users';

export default createStore({
  namespaced: true,
  modules: {
    articlsParams,
    categoryPages,
    errors,
    modals,
    metas,
    tokens,
    users,
  },
});
