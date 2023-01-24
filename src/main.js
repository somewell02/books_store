import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/router";
import store from "./data/store/vuex";

import Directives from "./services/directives/directives";

import "./assets/scss/index.scss";

import i18n from "./i18n";

const app = createApp(App);

Directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).use(i18n).mount("#app");
