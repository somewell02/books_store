import { firestore } from "./firebase.js";

const ordersCollection = firestore.collection("orders");

export const getOrders = async () => {
  const res = await ordersCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getOrderById = async (id) => {
  const res = await ordersCollection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const getOrdersByEmail = async (email, limit = 100) => {
  const res = await ordersCollection
    .where("userEmail", "==", email)
    .limit(limit)
    .get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addOrder = async (order) => {
  const res = await ordersCollection.add(order);
  return res ?? null;
};

export const orderPayments = [
  { id: "bank-card", title: "Картой на сайте" },
  {
    id: "upon-receipt",
    title: "Наличными или картой при получении",
  },
  {
    id: "bank-transfer",
    title: "Банковский перевод для юридических лиц",
  },
];

export const orderStatuses = [
  { id: "in-processing", title: "В обработке" },
  { id: "confirmed", title: "Подтвержден" },
  { id: "in-delivery", title: "Получен службой доставки" },
  { id: "received", title: "Получен клиентом" },
];
