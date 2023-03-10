import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/main/MainView.vue"),
  },
  {
    path: "/delivery",
    name: "delivery",
    component: () => import("../views/delivery/DeliveryView.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("../views/feedback/FeedbackView.vue"),
  },
  {
    path: "/books",
    name: "books-catalog",
    component: () => import("../views/books/BooksCatalogView.vue"),
  },
  {
    path: "/books/:id",
    name: "book-page",
    component: () => import("../views/books/BookView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/cart/CartView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/checkout/CheckoutView.vue"),
  },
  {
    path: "/order/:id",
    name: "order-page",
    component: () => import("../views/order/OrderView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    redirect: { name: "admin-auth" },
  },
  {
    path: "/admin/auth",
    name: "admin-auth",
    component: () => import("../views/dashboard/auth/AuthView.vue"),
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    meta: { title: "Заказы" },
    component: () => import("../views/dashboard/orders/OrdersView.vue"),
  },
  {
    path: "/admin/feedback",
    name: "admin-feedback",
    meta: { title: "Обратная связь" },
    component: () => import("../views/dashboard/feedback/FeedbackView.vue"),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    meta: { title: "Пользователи" },
    component: () => import("../views/dashboard/users/UsersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
