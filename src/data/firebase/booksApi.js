import { firestore } from "./firebase.js";

const booksCollection = firestore.collection("books");

export const getBooks = async () => {
  const res = await booksCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getBookById = async (id) => {
  const res = await booksCollection.doc(id).get();
  return res.exists ? res.data() : null;
};
