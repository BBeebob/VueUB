<template>
  <div class="login">
    <v-card
      v-if="!user.loginUser"
      class="mx-auto"
      style="position: absolute; left: 30px; right: 30px; bottom: 300px"
      max-width="344"
      variant="outlined"
    >
      <v-card-item>
        <div>
          <div class="text-h2 mb-1">Login page</div>
          <div class="text-caption"></div>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              name="email"
              append-icon="mdi-email"
              clearable
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <!-- <v-text-field
              name="pass"
              type="password"
              v-model="pass"
              :counter="20"
              :rules="passRules"
              label="Password"
              required
            ></v-text-field> -->
            <v-text-field
              v-model="pass"
              clearable
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passRules"
              :counter="20"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 20 characters"
              @click:append="show1 = !show1"
            ></v-text-field>

            <!-- <v-checkbox v-model="checkbox" label="จำรหัส" required></v-checkbox> -->
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
import router from "../router";
import { auth } from "../DB";
import {
  // getAuth,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
} from "firebase/auth";

import { useUserStore } from "@/stores/user";
// import { mapActions } from 'pinia'

// const root = useRootStore();

export default {
  name: "LoginPage",
  setup() {
    const user = useUserStore();
    return { user };
  },
  data: () => ({
    show: false,
    valid: true,
    show1: false,
    pass: "", //"080808088850085",
    passRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 20) || "Password must be less than 20 characters",
    ],
    email: "", //"std.62122420108@ubru.ac.th",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    checkbox: false,
  }),
  mounted() {},
  methods: {
    async ok() {
      console.log("Ok");

      const { valid } = await this.$refs.form.validate();

      if (valid) {
        //ถ้าตรวจสอบฟอร์มผ่าน
        //ล็อกอิน
        signInWithEmailAndPassword(auth, this.email, this.pass)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
            //ไปหน้าโฮม
            router.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("ชื่อ หรือ รหัสผ่านไม่ถูกต้อง");
          });
      }
    },
    close() {
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
  },
};
</script>
