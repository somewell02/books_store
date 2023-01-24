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

export const getBooksByIds = async (ids) => {
  if (!ids.length) return [];

  const res = await booksCollection.get();
  return res.docs
    .filter((doc) => ids.includes(doc.id))
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
};

export const getBooksByTag = async (tag, limit = 100) => {
  const res = await booksCollection
    .where("tags", "array-contains", tag)
    .limit(limit)
    .get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
