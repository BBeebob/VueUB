<template>
  <div class="login">
    <v-card
      v-if="!user.loginUser"
      class="mx-auto"
      style="position: relative; left: 30px; right: 30px; top: 100px"
      max-width="450"
      variant="outlined"
    >
      <v-card-item>
        <div>
          <div class="text-h4 mb-10 mt-5 d-flex justify-space-around">
            เข้าสู่ระบบ
          </div>
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
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passRules"
              :counter="20"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 20 characters"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn class="mr-5" @click="repass"> ลืมรหัสผ่าน </v-btn>
            <!-- <v-checkbox v-model="checkbox" label="จำรหัส" required></v-checkbox> -->
          </v-form>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn
          color="success"
          variant="outlined"
          elevation="3"
          width="110px"
          class="mx-auto mb-5"
          @click="ok"
        >
          OK
        </v-btn>

        <v-btn
          color="error"
          variant="outlined"
          elevation="3"
          width="110px"
          class="mx-auto mb-5"
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import router from "../router";
import { auth } from "../DB";
import {
  sendPasswordResetEmail,
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
      //เมื่อกดส่งแบบฟอร์มล็อกอิน
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
      //ปิดหน้าล็อกอิน
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
    repass() {
      // รีรหัส
      let emailrepass = prompt("โปรดใส่อีเมลสำหรับรีพาสเวิส");
      if (emailrepass) {
        sendPasswordResetEmail(auth, emailrepass)
          .then(() => {
            // Password reset email sent!

            alert("โปรดดรวจดูที่ อีเมลของท่าน เมลอาจอยู่ในถังขยะ");
          })
          .catch((error) => {
            alert(error.message);
            // ..
          });
      }
    },
  },
};
</script>
