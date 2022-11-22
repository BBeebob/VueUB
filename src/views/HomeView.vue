<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="John Leider"></v-list-item>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home"
            style="text"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-home"
            title="About"
            value="about"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-chat"
            title="About"
            value="about"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <div class="d-flex justify-center align-center h-100">
          <v-btn color="primary" @click.stop="drawer = !drawer"> Toggle </v-btn>
          <v-btn v-if="user.loginUser" color="blue" @click="logout()">
            Logout
          </v-btn>
          <v-btn v-if="!user.loginUser" color="blue" @click="login()">
            Login
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
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
