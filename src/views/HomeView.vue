<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-text-field
          v-model="s"
          label="ค้นหาสถานที่"
          density="compact"
          variant="solo"
          append-icon="mdi-magnify"
          single-line
          @click:append="send()"
        ></v-text-field>
        <!-- list -->
        <!-- <v-list :items="items" item-props lines="three" active-color="primary">
          <template v-slot:subtitle="{ subtitle }">
            <div v-html="subtitle"></div>
          </template>
        </v-list> -->

        <!-- --- -->
        <v-list lines="three">
          <v-list-subheader
            style="font-size: x-large; color: black"
            class="d-flex flex-column justify-space-between align-center text-h4"
            >สถานที่ทั้งหมด</v-list-subheader
          >

          <v-list-item
            v-for="(item, i) in listL"
            :key="i"
            :value="item"
            active-color="primary"
            :to="'/location/' + item.id"
            style="border-bottom: solid 1px #33333333"
          >
            <!-- แก้ให้สวย -->

            <v-row>
              <v-col cols="3">
                <!-- <v-avatar
                  size="300"
                  class="mr-4"
                  :color="item.color"
                  :image="item.pic"
                  >{{ item.n }}
                </v-avatar> -->
                <v-img
                  :aspect-ratio="4 / 3"
                  width="300"
                  :src="item.pic"
                  cover
                ></v-img>
              </v-col>

              <v-col cols="9"
                ><!-- แก้ให้สวย -->
                <h2>{{ item.title }}</h2>
                <br />

                <div
                  class="text-xs-h1"
                  style="background-color: rgba(0, 0, 0, 0.1)"
                >
                  {{ item.subtitle }}
                </div></v-col
              >
            </v-row>
            <!-- แก้ให้สวย -->
          </v-list-item>
        </v-list>
        <!-- list -->

        <!-- Dialog  -->
        <v-row justify="center" v-if="user.adminUser">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ props }">
              <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
              <v-btn
                v-bind="props"
                color="primary"
                size="large"
                style="position: fixed; right: 60px; bottom: 25px"
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
                <small></small>
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
  // orderBy,
} from "firebase/firestore";

import { useUserStore } from "@/stores/user";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import router from "../router";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const sgImgsRef = ref(storage, "images");

export default {
  name: "HomeView",
  setup() {
    //เรียกใช้ข้อมูลผู้ใช้
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      s: this.$route.query["s"] || "",
      dialog: false,
      dlgName: "",
      dlgPhoto: [],
      dlgAbout: "5555",
      selectedNdItem: 0,

      items: [],
    };
  },
  async mounted() {
    // เมื่อหน้าถูกเรียก ให้ดึงข้อมูลจากฐานข้อมูลแบบเรียลไทม์
    let q = query(collection(db, "Location"));

    // const unsubscribe =
    onSnapshot(q, (querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const n = doc.data().Photo[0];
        if (n) {
          const sgImgRef = ref(storage, "images/" + doc.id + "/" + n);
          getDownloadURL(sgImgRef).then((url) => {
            // Insert url into an <img> tag to "download"
            this.items.push({
              id: doc.id,
              title: doc.data().Name,
              subtitle: doc.data().About,

              pic: url,
            });
          });
        } else {
          this.items.push({
            id: doc.id,
            title: doc.data().Name,
            subtitle: doc.data().About,

            pic: "", // ใส่รูป ค่าเริ่มต้น
          });
        }
      });
      //จัดเรียงตาม title
      // console.log(this.items);
      // const www1 = this.items.sort((a, b) =>
      //   a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      // );
      // console.log(www1);
      // console.log(this.items);
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
  computed: {
    listL: function () {
      function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      const a = this.items;
      return a.sort(compare).filter((post) => {
        return post.title.toLowerCase().includes(this.s.toLowerCase());
      });
    },
  },
  watch: {
    dialog(n) {
      // ตรวจสอบเมื่อ dialog เปิด
      if (n) {
        this.dlgName = "";
        this.dlgPhoto = [];
        this.dlgAbout = "";
      }
    },
  },
  methods: {
    send() {
      if (this.s) {
        router.push("/?s=" + this.s);
      }
    },
    async dialogSave() {
      // เมื่อกดเซฟ dialog บันถึงสถานที่
      console.log("dialogSave");
      console.log(this.dlgPhoto);

      // ชื่อของรูปภาพทั้งหมด
      const photoName = [];
      this.dlgPhoto.forEach((file) => {
        photoName.push(file.name);
      });
      try {
        const docRef = await addDoc(collection(db, "Location"), {
          Name: this.dlgName,
          Photo: photoName,
          About: this.dlgAbout,
          TimeCreate: Date.now(),
          TimeUpdate: Date.now(),
        });

        console.log(docRef.id);
        // ที่อยู่รูปภาพ
        const sgIdRef = ref(sgImgsRef, docRef.id);
        console.log(sgIdRef);
        // อัพโหลดรูปทั้งหมด
        this.dlgPhoto.forEach((file) => {
          // 'file' comes from the Blob or File API
          const sgFileRef = ref(sgIdRef, file.name);
          uploadBytes(sgFileRef, file).then((snapshot) => {
            console.log("Uploaded : ", snapshot);
          });
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.dialog = false;
    },
    dialogClose() {
      // ปิด dialog
      console.log("dialogClose");
      this.dialog = false;
    },
  },
};
</script>
