import { firestore } from "./firebase.js";

const feedbackCollection = firestore.collection("feedback");

export const getFeedbacks = async () => {
  const res = await feedbackCollection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getFeedbackById = async (id) => {
  const res = await feedbackCollection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const addFeedback = async (feedback) => {
  const res = await feedbackCollection.add(feedback);
  return res ?? null;
};
