<template>
  <div class="login">
    <v-card
      v-if="!user.loginUser"
      class="mx-auto"
      style="position: absolute; left: 30px; right: 30px; bottom: 200px"
      max-width="344"
      variant="outlined"
    >
      <v-card-item>
        <div>
          <div class="text-h2 mb-1">Register page</div>
          <div class="text-caption"></div>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              name="email"
              append-icon="mdi-email"
              clearable
              v-model="email"
              :rules="emailRules"
              label="กรุณากรอกอีเมล"
              required
            ></v-text-field>

            <v-text-field
              v-model="pass"
              clearable
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passRules"
              :counter="20"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="กรุณากรอกรหัสผ่าน"
              hint="At least 20 characters"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              v-model="passconfirm"
              clearable
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passconfirmRules"
              :counter="20"
              :type="show1 ? 'text' : 'password'"
              name="confirm"
              label="กรุณากรอกรหัสผ่านอีกครั้ง"
              hint="At least 20 characters"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              name="name"
              append-icon="mdi-account"
              clearable
              v-model="name"
              :rules="nameRules"
              label="กรุณากรอกชื่อและนามสกุล"
              required
            ></v-text-field>

            <v-text-field
              name="faculty"
              append-icon="mdi-book"
              clearable
              v-model="faculty"
              :rules="facultyRules"
              label="กรุณากรอกคณะ"
            ></v-text-field>

            <v-text-field
              name="phonenumber"
              append-icon="mdi-phone"
              clearable
              v-model="phonenumber"
              :rules="phonenumberRules"
              label="กรุณากรอกเบอร์โทร"
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
import { auth, db } from "../DB";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useUserStore } from "@/stores/user";
import { doc, setDoc } from "firebase/firestore";
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
      (v) => !!v || "ต้องใส่รหัสผ่าน",
      (v) => (v && v.length <= 20) || "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร",
    ],
    passconfirm: "", //"080808088850085",
    passconfirmRules: [
      (v) => !!v || "ต้องใส่รหัสผ่าน",
      (v) => (v && v.length <= 20) || "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร",
    ],
    email: "", //"std.62122420108@ubru.ac.th",
    emailRules: [
      (v) => !!v || "ต้องใส่อีเมล",
      (v) => /.+@.+\..+/.test(v) || "รูปแบบไม่ถูกต้อง",
    ],
    name: "",
    nameRules: [
      (v) => !!v || "ต้องใส่ชื่อและนามสกุล",
      (v) => /.+ .+/.test(v) || "ต้องใส่ชื่อและนามสกุล",
    ],
    faculty: "",
    facultyRules: [(v) => !!v || "ต้องใส่คณะ"],

    phonenumber: "",
    phonenumberRules: [],

    checkbox: false,
  }),
  mounted() {},
  methods: {
    async ok() {
      //เมื่อกดส่งแบบฟอร์มล็อกอิน
      console.log("Ok");
      if (this.pass !== this.passconfirm) {
        alert("passconfirm ไม่ตรง ");
        this.passconfirm = "";
      }
      {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
          //ถ้าตรวจสอบฟอร์มผ่าน

          //ล็อกอิน
          createUserWithEmailAndPassword(auth, this.email, this.pass)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              // ... สร้างโปรไฟล์
              await setDoc(doc(db, "Profile", user.uid), {
                name: this.name,
                faculty: this.faculty,
                email: this.email,
                phonenumber: this.phonenumber,

                TimeCreate: Date.now(),
                TimeUpdate: Date.now(),
              });

              //ไปหน้าโฮม
              router.push("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              alert(errorMessage);
            });
        }
      }
    },
    close() {
      //ปิดหน้าล็อกอิน
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
  },
};
</script>
