import { firestore } from "./firebase.js";

const promotionsCollection = firestore.collection("promotions");

export const getPromotions = async (limit = 100) => {
  const res = await promotionsCollection.limit(limit).get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getPromotionById = async (id) => {
  const res = await promotionsCollection.doc(id).get();
  return res.exists ? res.data() : null;
};
