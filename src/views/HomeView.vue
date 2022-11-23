<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-text-field
          label="ค้นหาสถานที่"
          density="compact"
          variant="solo"
          append-inner-icon="mdi-magnify"
          single-line
        ></v-text-field>
        <!-- list -->
        <!-- <v-list :items="items" item-props lines="three" active-color="primary">
          <template v-slot:subtitle="{ subtitle }">
            <div v-html="subtitle"></div>
          </template>
        </v-list> -->

        <!-- --- -->
        <v-list lines="three">
          <v-list-subheader style="font-size: x-large; color: black"
            >สถานที่</v-list-subheader
          >

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
            prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
            :to="'/location/' + item.id"
            style="border-bottom: solid 1px #33333333"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <v-list-item-subtitle>
              {{ item.subtitle }}
            </v-list-item-subtitle>
          </v-list-item>
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
                style="position: fixed; right: 20px; bottom: 20px"
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
import { db } from "../DB";
import {
  collection,
  addDoc,
  // getDocs,
  query,
  // where,
  onSnapshot,
} from "firebase/firestore";

import { useUserStore } from "@/stores/user";

export default {
  name: "HomeView",
  setup() {
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      dialog: false,
      dlgName: "",
      dlgPhoto: [],
      dlgAbout: "5555",
      selectedNdItem: 0,

      items: [
        // { type: "subheader", title: "สถานที่" }
      ],
    };
  },
  async mounted() {
    const q = query(collection(db, "Location"));
    // const unsubscribe =
    onSnapshot(q, (querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        this.items.push({
          id: doc.id,
          title: doc.data().Name,
          subtitle: doc.data().About,
        });
      });
      // console.log(unsubscribe);
    });

    // const unsub = onSnapshot(doc(db, "Location", this.id), (doc) => {
    //   // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //   // console.log(source, " data: ", doc.data());
    //   this.Name = doc.data().Name;
    //   this.About = doc.data().About;
    // });
    // console.log(unsub);

    // const querySnapshot = await getDocs(collection(db, "Location"));
    // querySnapshot.forEach((doc) => {
    //   // console.log(`${doc.id} => ${doc.data()}`);
    //   console.log(doc.data());
    //   this.items.push({
    //     id: doc.id,
    //     title: doc.data().Name,
    //     subtitle: doc.data().About,
    //   });
    //   // this.items.push({ type: "divider" });
    // });
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

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.dialog = false;
    },
    dialogClose() {
      console.log("dialogClose");
      this.dialog = false;
    },
  },
};
</script>
