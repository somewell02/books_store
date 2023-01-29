import { auth, firebaseApp } from "./firebase.js";
import "firebase/compat/auth";
import store from "@/data/store/vuex";
import router from "@/router/router.js";
import { getUserById } from "./usersApi";
import { getUserRoleById } from "./userRolesApi";

export const getAuthUser = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      isStaff(user.uid)
        .then((role) => {
          if (role.staff) {
            getUserById(user.uid).then((data) => {
              data.role = role;
              store.commit("user/setUser", data);
            });
          } else {
            logout();
            router.push({ name: "admin-auth" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (
      router.currentRoute.value.name.slice(0, 5) === "admin" &&
      router.currentRoute.value.name !== "admin-auth"
    ) {
      router.push({ name: "admin-auth" });
    }
  });
};

export const getAuth = async (email, password) => {
  return await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return isStaff(data.user.uid)
        .then((role) => {
          return role?.staff ? "access" : "no-access";
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      return error.code;
    });
};

export const logout = () => {
  firebaseApp
    .auth()
    .signOut()
    .then(function () {
      store.commit("user/setUser", null);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export const isStaff = async (uid) => {
  const user = await getUserById(uid);
  if (user) {
    const role = await getUserRoleById(user.role);
    return role ?? false;
  } else return false;
};
