<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col> <h1>Profile</h1> </v-col>
      </v-row>
      <v-row>
        <v-col>
          e mail : {{ user.email }}
          <!-- <v-text-field v-model="email" label="E-mail" readonly></v-text-field> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          name : {{ user.name }}
          <!-- <v-text-field
            :model-value="user.name"
            name="name"
            v-model="name"
            label="ชื่อ นามสกุล"
            :rules="nameRules"
            required
            clearable
          ></v-text-field> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          faculty : {{ user.faculty }}
          <!-- <v-text-field
            name="faculty"
            v-model="faculty"
            label="ชื่อคณะ"
            :rules="facultyRules"
            required
            clearable
          ></v-text-field> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          phonenumber : {{ user.phonenumber }}

          <!-- <v-text-field
            name="phonenumber"
            v-model="phonenumber"
            label="ชื่อคณะ"
            :rules="phonenumberRules"
            required
            clearable
          ></v-text-field> -->
        </v-col>
      </v-row>

      <v-row class="pb-7">
        <!-- <v-col>
          <v-btn color="success" @click="save()">แก้ไขโปรไฟล์</v-btn>
        </v-col>
        <v-col> </v-col>
        <v-col>
          <v-btn color="warning">รีเซทพาสเวิส</v-btn>
        </v-col> -->
        <v-col>
          <v-btn color="" @click="close()">กลับหน้าหลัก</v-btn>
        </v-col>
      </v-row>
      <hr />

      <v-row class=""> </v-row>
    </v-container>
  </v-form>
</template>
<script>
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../DB";
import router from "../router";
import { useUserStore } from "../stores/user";

export default {
  name: "ProfilePage",
  setup() {
    const user = useUserStore();
    return { user };
  },
  mounted() {},
  data() {
    return {
      //   email: this.user.email,
      //   name: this.user.name,
      //   nameRules: [
      //     (v) => !!v || "ต้องใส่ชื่อและนามสกุล",
      //     (v) => /.+ .+/.test(v) || "ต้องใส่ชื่อและนามสกุล",
      //   ],
      //   faculty: "",
      //   facultyRules: [(v) => !!v || "ต้องใส่คณะ"],
      //   phonenumber: "",
      //   phonenumberRules: [],
      //   pic: this.user.pic,
      //   pass: "",
      //   passRules: [
      //     (v) => !!v || "ต้องใส่รหัสผ่าน",
      //     (v) => (v && v.length <= 20) || "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร",
      //   ],
      //   newpass: "",
      //   newpassRules: [
      //     (v) => !!v || "ต้องใส่รหัสผ่าน",
      //     (v) => (v && v.length <= 20) || "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร",
      //   ],
      //   renewpass: "",
      //   renewpassRules: [
      //     (v) => !!v || "ต้องใส่รหัสผ่าน",
      //     (v) => (v && v.length <= 20) || "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร",
      //   ],
    };
  },
  methods: {
    // async save() {
    //   await updateDoc(doc(db, "Profile", this.user.uid), {
    //     name: this.name,
    //     faculty: this.faculty,
    //     email: this.email,
    //     phonenumber: this.phonenumber,
    //     TimeUpdate: Date.now(),
    //   });
    // },
    close() {
      //ปิดหน้าล็อกอิน
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
  },
};
</script>
