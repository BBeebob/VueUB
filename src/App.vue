<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ระบบจองสถานที่ UBRU</v-toolbar-title>

      <v-btn variant="outlined" v-if="user.loginUser" @click="logout()">
        Logout
      </v-btn>
      <v-btn variant="outlined" v-if="!user.loginUser" @click="login()">
        Login
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" absolute clipped>
      <v-list :lines="false" nav>
        <v-list-item
          v-for="(item, i) in ndItems"
          :key="i"
          :value="item"
          :to="item.to"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- ------ -->
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
import { signOut } from "firebase/auth";

import { useUserStore } from "@/stores/user";
import router from "@/router";

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
    drawer: null,
    ndItems: [
      { title: "หน้าแรก", icon: "mdi-home", to: "/" },
      { title: "รายการจอง", icon: "mdi-book", to: "/reserve" },
      { title: "ติดต่อ", icon: "mdi-comment", to: "/about" },
    ],
  }),
  methods: {
    login() {
      router.push("/login");
    },
    logout() {
      //--
      console.log(this.uid);
      signOut(auth);
      console.log("logout");
    },
  },
};
</script>
