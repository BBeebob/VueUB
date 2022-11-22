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
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-btn
          color="primary"
          size="large"
          style="position: absolute; right: 20px; bottom: 20px"
          icon
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "../DB";

import { signOut } from "firebase/auth";
import { useUserStore } from "@/stores/user";
import router from "../router";

export default {
  setup() {
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "หน้าแรก", icon: "mdi-home" },
        { title: "รายการจอง", icon: "mdi-book" },
        { title: "ติดต่อ", icon: "mdi-comment" },
      ],
    };
  },
  computed: {},
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
