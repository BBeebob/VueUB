<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "./DB";
import {
  // getAuth,
  // signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { useUserStore } from "@/stores/user";

export default {
  name: "App",
  setup() {
    const user = useUserStore();

    onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        user.uid = u.uid;
        // ...
        console.log(user.uid);
        console.log("ล็อกอินแล้วจ้า");
        // router.push("/");
        // root.login();
      } else {
        // User is signed out
        // ...
        user.uid = "";
        console.log("no user");
        // root.logout();
      }
    });

    return { user };
  },
  data: () => ({
    //
  }),
};
</script>
