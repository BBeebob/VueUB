<template>
  <div class="LocationView">
    <h1>LocationView</h1>
    รูป
    <v-row class="รูป">
      <v-col v-for="n in pathImgs" :key="n" class="d-flex child-flex" cols="4">
        <v-img :src="n" aspect-ratio="1" cover class="bg-grey-lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10"
        >id : {{ id }} <br />
        Name : {{ Name }} <br />
        About : {{ About }}<br
      /></v-col>
      <v-col cols="2">
        <!-- Dialog  -->
        <v-row justify="center">
          <v-dialog v-model="dialogEdit" persistent>
            <template v-slot:activator="{ props }"
              ><v-btn color="error" @click="delL(id)"> ลบ </v-btn>
              <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
              <v-btn v-bind="props" color="warning" @click="editL()">
                <v-icon>mdi-plus</v-icon>Edit
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">แก้ไขสถานที่</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อสถานที่*"
                        required
                        clearable
                        v-model="eName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        prepend-icon=""
                        multiple
                        accept="image/*"
                        label="รูปสถานที่"
                        v-model="ePhoto"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-textarea
                        name="input-7-1"
                        variant="filled"
                        label="รายละเอียดสถานที่"
                        auto-grow
                        v-model="eAbout"
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
                  @click="dialogEditClose"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialogEditSave"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!--  -->
        <!--  -->
      </v-col>
    </v-row>

    <!-- ---- -->
    <!-- ---List --- -->
    <v-list lines="three">
      <v-list-subheader style="font-size: x-large; color: black"
        >จองแล้ว</v-list-subheader
      >

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
      >
        <v-list-item-title>{{ item.by }}</v-list-item-title>

        <v-list-item-subtitle>
          Start :{{ item.StartDate }} - {{ item.StartTime }}<br />
          End :{{ item.EndDate }} - {{ item.EndTime }}<br />

          About :{{ item.About }}<br />
          by :{{ item.by }}<br />
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn
            color="red"
            icon="mdi-information"
            variant="text"
            @click="del(item.id)"
          ></v-btn>
        </template>
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
            style="position: absolute; right: 20px; bottom: 20px"
            icon
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">จองสถานที่</span>
          </v-card-title>
          <v-card-subtitle>
            Name : {{ Name }}<br />
            โดย : {{ user.uid }}
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="dlgStartDate"
                    label="เริ่ม วันที่"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="dlgStartTime"
                    label="เวลา"
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="dlgEndDate"
                    label="ถึง วันที่"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="dlgEndTime"
                    label="เวลา"
                    type="time"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-textarea
                    name="input-7-1"
                    variant="filled"
                    label="หมายเหตุ"
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
            <v-btn color="blue-darken-1" variant="text" @click="dialogClose">
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
  </div>
</template>

<script>
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  // updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../DB";
import { useUserStore } from "@/stores/user";
import router from "../router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
export default {
  name: "LocationView",
  setup() {
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      dialog: false, //เพิ่มการจอง
      dialogEdit: false, //แก้ไขโลเคชั่น
      id: this.$route.params.id, // ไอดี โลเคชั่นจาก url
      urlImgs: [], //url ims ของโลเคชั่น

      Name: "", //ชื่อ โลเคชั่น
      Photo: [], // ชื่อรูปทั้งหมดโลเคชั่น
      About: "", // หมายเหตุ
      eName: "", // ชื่อโลเคชั่น หน้าแก้ไข
      ePhoto: [], // ชื่อรูปทั้งหมดโลเคชั่น  หน้าแก้ไข
      eNewPhoto: [], //รูปใหม่ หน้าแก้ไข
      eAbout: "", // หมายเหตุ  หน้าแก้ไข

      items: [
        // รายการการจอง
      ],
      dlgAbout: "5555", //เพิ่มการจอง หมายเหตุ

      dlgStartDate: "", //เพิ่มการจอง
      dlgStartTime: "", //เพิ่มการจอง
      dlgEndDate: "", //เพิ่มการจอง
      dlgEndTime: "", //เพิ่มการจอง
      dlgTimeCreate: "", //เพิ่มการจอง วันที่สร้าง
    };
  },
  methods: {
    editL() {
      // แก้ไข Location เมื่อเปิด
      this.eName = this.Name;
      this.ePhoto = this.Photo;
      this.eNewPhoto = [];
      this.eAbout = this.About;

      this.dialogEdit = true;
    },
    async dialogEditSave() {
      // แก้ไข Location เมื่อเซฟ
      await updateDoc(doc(db, "Location", this.id), {
        Name: this.eName,
        About: this.eAbout,
      });
      this.dialogEditClose();
    },
    async del(id) {
      console.log("no : " + id);
      //del Reserve

      await deleteDoc(doc(db, "Reserve", id));
    },
    async delL(id) {
      console.log("no : " + id);
      //del Location

      router.push("/");
      await deleteDoc(doc(db, "Location", id));
    },
    async dialogSave() {
      console.log("dialogSave");
      //เมื่อ เพิ่ม การจอง
      try {
        // const docRef =
        await addDoc(collection(db, "Reserve"), {
          idL: this.id,
          nameL: this.Name,
          StartDate: this.dlgStartDate,
          StartTime: this.dlgStartTime,
          EndDate: this.dlgEndDate,
          EndTime: this.dlgEndTime,

          About: this.dlgAbout,
          by: this.user.uid,
          status: false,
        });

        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.dialog = false;
    },
    dialogClose() {
      //ปิดการจอง
      console.log("dialogClose");
      this.dialog = false;
    },
    dialogEditClose() {
      //ปิดแก้ไข Location
      console.log("dialogClose");
      this.dialogEdit = false;
    },
  },
  mounted() {
    // เมื่อเปิดหน้า ทำการโหลด Location ของหน้า

    // const unsub =
    onSnapshot(doc(db, "Location", this.id), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      this.Name = doc.data().Name;
      this.Photo = doc.data().Photo;
      this.About = doc.data().About;

      this.pathImgs = [];
      this.Photo.forEach((name) => {
        const sgImgRef = ref(
          storage,
          "images/" + this.$route.params.id + "/" + name
        );
        console.log(sgImgRef);
        // Get the download URL

        getDownloadURL(sgImgRef).then((url) => {
          // Insert url into an <img> tag to "download"
          this.urlImgs.push(url);
        });
      });
      console.log(this.urlImgs);
    });
    // console.log(unsub);

    //----------
    // เมื่อเปิดหน้า ทำการโหลด Reserve ของหน้า ที่ ถูกยืนยันแล้ว
    const q = query(
      collection(db, "Reserve"),
      where("status", "==", true),
      where("idL", "==", this.id)
    );
    // const unsubscribe =
    onSnapshot(q, (querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        this.items.push({
          id: doc.id,
          title: doc.data().by,
          ...doc.data(),
        });
      });
      //จัดเรียง
      this.items.sort((a, b) =>
        a.Name > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      console.log(this.items);
    });
  },
};
</script>
