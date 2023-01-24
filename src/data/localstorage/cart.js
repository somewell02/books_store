export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};
