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
      <v-list :lines="false" density="compact" nav>
        <v-list-item
          v-for="(item, i) in ndItems"
          :key="i"
          :value="item"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <!-- list -->
        <v-list :items="items" item-props lines="three">
          <template v-slot:subtitle="{ subtitle }">
            <div v-html="subtitle"></div>
          </template>
        </v-list>
        <!-- list -->

        <!-- Dialog  -->
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ props }">
              <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
              <v-btn
                v-bind="props"
                color="primary"
                size="large"
                style="position: absolute; right: 20px; bottom: 20px"
                icon
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">เพิ่มสถานที่</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อสถานที่*"
                        required
                        clearable
                        v-model="dlgName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        prepend-icon=""
                        multiple
                        accept="image/*"
                        label="รูปสถานที่"
                        v-model="dlgPhoto"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-textarea
                        name="input-7-1"
                        variant="filled"
                        label="รายละเอียดสถานที่"
                        auto-grow
                        v-model="dlgAbout"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6"> </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialogClose"
                >
                  Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialogSave">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!--  -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { auth, db } from "../DB";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { signOut } from "firebase/auth";
import { useUserStore } from "@/stores/user";
import router from "../router";

export default {
  name: "HomeView",
  setup() {
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      drawer: null,
      dialog: false,
      dlgName: "",
      dlgPhoto: [],
      dlgAbout: "5555",
      selectedNdItem: 0,
      ndItems: [
        { title: "หน้าแรก", icon: "mdi-home" },
        { title: "รายการจอง", icon: "mdi-book" },
        { title: "ติดต่อ", icon: "mdi-comment" },
      ],

      items: [{ type: "subheader", title: "รายการ" }],
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "Location"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
      this.items.push({
        title: doc.data().Name,
        subtitle: doc.data().About,
      });
      this.items.push({ type: "divider" });
    });
  },
  computed: {},
  watch: {
    dialog(n) {
      if (n) {
        this.dlgName = "";
        this.dlgPhoto = [];
        this.dlgAbout = "";
      }
    },
  },
  methods: {
    async dialogSave() {
      console.log("dialogSave");
      console.log(this.dlgPhoto);

      try {
        const docRef = await addDoc(collection(db, "Location"), {
          Name: this.dlgName,
          // Photo: this.dlgPhoto,
          About: this.dlgAbout,
        });

        this.items.push({
          title: this.dlgName,
          subtitle: this.dlgAbout,
        });
        this.items.push({ type: "divider" });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // Add a new document in collection "cities"
      // await addDoc(doc(db, "Location"), {
      //   Name: this.dlgName,
      //   // Photo: this.dlgPhoto,
      //   About: this.dlgAbout,
      // });

      this.dialog = false;
    },
    dialogClose() {
      console.log("dialogClose");
      this.dialog = false;
    },
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
