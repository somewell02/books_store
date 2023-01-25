import { getCart, setCart } from "@/data/localstorage/cart";
import { getBooksByIds } from "@/data/firebase/booksApi";

const cartModule = {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    getCartItems(state) {
      return state.cartItems;
    },
    getCartItemsQuantity(state) {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    getCartTotal(state) {
      return state.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.item.price,
        0
      );
    },
  },
  mutations: {
    addCartItem(state, cartItem) {
      if (state.cartItems.find((item) => item.item.id === cartItem.id)) {
        state.cartItems.find(
          (item) => item.item.id === cartItem.id
        ).quantity += 1;
      } else {
        state.cartItems = [...state.cartItems, { item: cartItem, quantity: 1 }];
      }

      setCart(
        state.cartItems.map((item) => ({
          item: item.item.id,
          quantity: item.quantity,
        }))
      );
    },
    decCartItem(state, cartItem) {
      if (state.cartItems.find((item) => item.item.id === cartItem.id)) {
        state.cartItems.find(
          (item) => item.item.id === cartItem.id
        ).quantity -= 1;

        setCart(
          state.cartItems.map((item) => ({
            item: item.item.id,
            quantity: item.quantity,
          }))
        );
      }
    },
    deleteCartItem(state, cartItem) {
      state.cartItems = state.cartItems.filter(
        (item) => item.item.id !== cartItem.id
      );
      setCart(
        state.cartItems.map((item) => ({
          item: item.item.id,
          quantity: item.quantity,
        }))
      );
    },
    setCart(state, cartItems) {
      state.cartItems = cartItems;
    },
  },
  actions: {
    async getItemsByIds(context) {
      const cartItemsIds = getCart().map((item) => item.item);
      const items = await getBooksByIds(cartItemsIds);

      const cartItems = getCart().map((cartItem) => ({
        item: items.find((item) => item.id === cartItem.item),
        quantity: cartItem.quantity,
      }));

      context.commit("setCart", cartItems);
    },
  },
  namespaced: true,
};

export default cartModule;
