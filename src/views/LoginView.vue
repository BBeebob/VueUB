<template>
  <div class="login">
    <h1>Login page</h1>

    <v-card class="mx-auto" max-width="344" variant="outlined">
      <v-card-item>
        <div>
          <div class="text-h2 mb-1">Login page</div>
          <div class="text-caption"></div>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="pass"
              :counter="20"
              :rules="passRules"
              label="Pass"
              required
            ></v-text-field>
            <v-checkbox v-model="checkbox" label="จำรหัส" required></v-checkbox>
          </v-form>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn color="success" class="mr-4" @click="ok"> OK </v-btn>

        <v-btn color="error" class="mr-4" @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { auth } from "../DB";
import {
  // getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router";
// import { useRootStore } from "@/stores/root";
// import { mapActions } from 'pinia'

// const root = useRootStore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    console.log(uid);
    console.log("ล็อกอินแล้วจ้า");
    router.push("/");
    // root.login();
  } else {
    // User is signed out
    // ...
    console.log("no user");
    // root.logout();
  }
});

export default {
  name: "LoginPage",
  data: () => ({
    show: false,
    valid: true,
    pass: "",
    passRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    checkbox: false,
  }),

  methods: {
    async ok() {
      console.log("Ok");
      //ล็อกอิน
      signInWithEmailAndPassword(auth, this.email, this.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      //ไปหน้าโฮม
      router.push("/");
    },
    close() {
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
  },
};
</script>
