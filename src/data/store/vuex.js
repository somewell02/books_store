import { createStore } from "vuex";
import userModule from "./userModule";
import cartModule from "./cartModule";

export default createStore({
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: userModule,
    cart: cartModule,
  },
});
