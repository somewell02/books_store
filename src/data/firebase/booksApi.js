import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const booksCollection = firestore.collection("books");

export const subscribeBooks = () => {
  const rooms = ref(null);

  const close = booksCollection.onSnapshot((snapshot) => {
    rooms.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);

  return new Promise((resolve) => {
    resolve(rooms);
  });
};

export const getBooks = async () => {
  const res = await booksCollection.get();
  const rooms = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return rooms;
};

export const getBookById = async (id) => {
  const res = await booksCollection.doc(id).get();
  return res.exists ? res.data() : null;
};
