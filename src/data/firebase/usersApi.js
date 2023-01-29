import { firestore } from "./firebase.js";

const usersCollection = firestore.collection("users");

export const getUsers = async () => {
  const res = await usersCollection.get();
  const users = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};

export const getUserById = async (id) => {
  const res = await usersCollection.doc(id).get();
  if (res.exists) {
    return {
      id: id,
      ...res.data(),
    };
  } else return null;
};

export const addUser = async (user) => {
  const res = await usersCollection.add(user);
  return res ?? null;
};
