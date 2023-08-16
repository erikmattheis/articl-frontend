import { createApp } from "vue";
import VueCookies from "vue-cookies";

import App from "./App.vue";
import './assets/global.scss';
import router from "./router";
import store from "./store/index";
import isLoggedInMixin from "./mixins/isLoggedInMixin";
import setTitleAndDescriptionMixin from "./mixins/setTitleAndDescriptionMixin";
import axiosInstance from "./services/axiosService";

const app = createApp(App);

app.use(router);


let secure = true;

if (window.location.hostname === "192.168.1.130" || window.location.hostname === "localhost") {
  secure = false;
}

app.use(VueCookies, {
  secure,
});

app.use(store);

/*
app.config.errorHandler = (error) => {
  store.dispatch('errors/setError', error);
};

window.addEventListener('unhandledrejection', (event) => {
  store.dispatch('errors/setError', event.reason);
});
*/

app.mixin(isLoggedInMixin);
app.mixin(setTitleAndDescriptionMixin);

axiosInstance.interceptors.request.use(
  (request) => {
    const req = request;
    const { accessTokenValue } = store.state.tokens;

    if (accessTokenValue && req.url !== "/auth/refresh-tokens") {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }

    return Promise.resolve(req);
  },
  (error) => error,
);

const BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;

// Register unauthorized HTTP error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor error:", error);

    const { status } = error.response || {};
    console.log("Response status:", status);

    if (status === HTTP_UNAUTHORIZED) {
      console.log("Attempting to refresh session");
      try {
        // Attempt to refresh the access token
        await store.dispatch("tokens/refreshSession");
        console.log("Access token refreshed");

        // Retry the original request
        return axiosInstance(error.config);
      } catch (err) {
        console.log("Error refreshing session:", err);

        // Logout user and redirect to login page
        store.dispatch("users/logout");
        router.push({ name: "login" });
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);


// Register forbidden HTTP error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error;
    if (status === HTTP_FORBIDDEN) {
      router.push({ name: "Forbidden" });
    }
    return Promise.reject(error);
  },
);

app.mount("#app");
