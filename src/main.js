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
const TOO_MANY_REQUESTS = 429;

// Register unauthorized HTTP error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor error:", error);

    if (status === HTTP_FORBIDDEN) {
      console.log('Forbidden')
      return router.push({ name: "Forbidden" });
    }
    console.log("error.status", error)
    if (error.status === TOO_MANY_REQUESTS) {
      console.log("Too many requests");

      return Promise.reject(error);
    }

    if (error.response.status === HTTP_UNAUTHORIZED && !error.config.url.includes("/auth/refresh-tokens")) {
      console.log("Access token is invalid or has expired.");
      const success = await store.dispatch("tokens/refreshSession");
      if (success) {
        // Retry the original request
        return axiosInstance.request(error.config);
      } else {
        console.log("Error refreshing session.");
        return router.push({ name: "LoginPage" });
      }
    }

    return Promise.reject(error);
  }
);

app.mount("#app");
