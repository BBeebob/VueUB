<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ระบบจองสถานที่ UBRU</v-toolbar-title>
      <v-avatar
        class="mr-4"
        :color="avt.color"
        @click="profile()"
        v-if="user.loginUser"
      >
        {{ avt.name }}
      </v-avatar>
      <v-btn
        class="mr-3"
        variant="outlined"
        v-if="!user.loginUser"
        @click="register()"
      >
        Register
      </v-btn>
      <v-btn variant="outlined" v-if="user.loginUser" @click="logout()">
        Logout
      </v-btn>
      <v-btn variant="outlined" v-if="!user.loginUser" @click="login()">
        Login
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list :lines="false" nav>
        <v-list-item
          v-for="(item, i) in mItems"
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
import { auth, db, stringToColour } from "./DB";
import {
  // getAuth,
  // signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { signOut } from "firebase/auth";

import { useUserStore } from "@/stores/user";
import router from "@/router";
import { doc, onSnapshot } from "firebase/firestore";

export default {
  name: "App",
  setup() {
    const user = useUserStore();
    // ตรวจสอบยูสล็อกอินหรือไม่
    onAuthStateChanged(auth, (u) => {
      if (u) {
        // ถ้าล็อกอิน

        user.uid = u.uid;
        user.email = u.email;
        user.pic = u.photoURL;

        // const unsub =
        onSnapshot(doc(db, "Profile", user.uid), (doc) => {
          // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source, " data: ", doc.data());
          if (doc.data()) {
            user.name = doc.data().name;
            user.faculty = doc.data().faculty;
            user.phonenumber = doc.data().phonenumber;
          }
        });

        // ...
        console.log(user);
        console.log("ล็อกอินแล้วจ้า");
        // router.push("/");
        // root.login();
      } else {
        // ถ้าไม่ล็อกอิน
        // User is signed out
        // ...
        user.uid = "";
        user.email = "";
        user.pic = "";
        user.name = "";
        user.faculty = "";
        user.phonenumber = "";

        console.log("no user");
        // root.logout();
      }
    });

    return { user };
  },
  data: () => ({
    drawer: null,
    ndItems: [
      { title: "หน้าแรก", icon: "mdi-home", to: "/", show: "all" },
      { title: "รายการจอง", icon: "mdi-book", to: "/reserve", show: "admin" },
      { title: "ติดต่อ", icon: "mdi-comment", to: "/about", show: "all" },
    ],
  }),
  computed: {
    avt() {
      return stringToColour(this.user.name);
    },
    mItems() {
      const o = [];
      this.ndItems.forEach((i) => {
        if (
          i.show == "all" ||
          (this.user.adminUser && i.show == "admin") ||
          (this.user.loginUser && i.show == "user")
        ) {
          o.push(i);
        }
      });
      return o;
    },
  },
  methods: {
    profile() {
      //ไปหน้าล็อกอิน
      router.push("/profile");
    },
    login() {
      //ไปหน้าล็อกอิน
      router.push("/login");
    },
    register() {
      //ไปหน้าล็อกอิน
      router.push("/register");
    },
    logout() {
      // ล็อกเอ้า
      console.log(this.uid);
      signOut(auth);
      console.log("logout");
    },
  },
};
</script>
