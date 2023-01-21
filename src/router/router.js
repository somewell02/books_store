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
    path: "/admin",
    name: "admin",
    redirect: { name: "admin-orders" },
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    meta: { title: "Заказы" },
    component: () => import("../views/dashboard/OrdersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
