import { firestore } from "./firebase.js";

const rolesCollection = firestore.collection("userRoles");

export const getUserRoles = async () => {
  const res = await rolesCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserRoleById = async (id) => {
  const res = await rolesCollection.doc(id).get();
  return res.exists ? { id: res.id, ...res.data() } : null;
};
