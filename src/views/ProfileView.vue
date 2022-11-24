<template>
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
        <!-- <v-btn color="" @click="gohome()">กลับหน้าหลัก</v-btn> -->
      </v-col>
    </v-row>
    <hr />

    <v-row class=""> </v-row>

    <!-- Dialog แก้ไข  -->
    <v-row justify="center" v-if="user.loginUser">
      <v-dialog v-model="dialogEdit" persistent>
        <template v-slot:activator="{ props }">
          <!-- <v-btn color="error" @click="delL(id)"> ลบ </v-btn> -->
          <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
          <v-btn v-bind="props" color="warning" @click="editL()">
            <v-icon>mdi-plus</v-icon>Edit
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">แก้ไขโปรไฟล์</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="ชื่อ*"
                    required
                    clearable
                    v-model="name"
                    :role="nameRules"
                  ></v-text-field>
                </v-col>

                <!-- --------- -->

                <v-col cols="12">
                  <v-text-field
                    label="คณะ"
                    required
                    clearable
                    v-model="faculty"
                    :role="facultyRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="เบอร์โทร*"
                    required
                    clearable
                    v-model="phonenumber"
                    :role="phonenumberRules"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12">
                  <v-file-input
                    accept="image/*"
                    label="เปลี่ยนรูปโปรไฟล"
                    v-model="newPic"
                  ></v-file-input>
                </v-col> -->
              </v-row>
            </v-container>
            <small></small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialogEditClose()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialogEditSave()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  -->
  </v-container>
</template>
<script>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../DB";
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
      dialogEdit: false, //เพิ่มการจอง

      name: "",
      nameRules: [
        (v) => !!v || "ต้องใส่ชื่อและนามสกุล",
        (v) => /.+ .+/.test(v) || "ต้องใส่ชื่อและนามสกุล",
      ],
      faculty: "",
      facultyRules: [(v) => !!v || "ต้องใส่คณะ"],
      phonenumber: "",
      phonenumberRules: [],
      newPic: null,
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
    async dialogEditSave() {
      // แก้ไข Location เมื่อเซฟ
      console.log("es");
      await updateDoc(doc(db, "Profile", this.user.uid), {
        name: this.name,
        faculty: this.faculty,
        phonenumber: this.phonenumber,

        TimeUpdate: Date.now(),
      });

      this.dialogEditClose();
    },

    editL() {
      // แก้ไข Location เมื่อเปิด
      this.name = this.user.name;
      this.faculty = this.user.faculty;
      this.phonenumber = this.user.phonenumber;

      this.dialogEdit = true;
    },
    dialogEditClose() {
      //ปิดแก้ไข Location
      console.log("dialogClose");
      this.dialogEdit = false;
    },

    gohome() {
      //ปิดหน้าล็อกอิน
      console.log("ปิด");
      router.push("/");
      //ไปหน้าโฮม
    },
  },
};
</script>
