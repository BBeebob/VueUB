<template>
  <div class="LocationView">
    <br />
    <h1 class="d-flex flex-column justify-space-between align-center">
      {{ Name }}
    </h1>
    <br />
    <v-carousel
      class="fill-height"
      v-model="model1"
      max-height
      :show-arrows="true"
    >
      <v-carousel-item
        v-for="(item, i) in urlImgs"
        :key="i"
        :src="item.url"
        cover
      ></v-carousel-item>
    </v-carousel>
    <!-- <v-row class="รูป">
      <v-col v-for="n in urlImgs" :key="n" class="d-flex child-flex" cols="4">
        <v-img :src="n.url" aspect-ratio="1" cover class="bg-grey-lighten-2">
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
    </v-row> -->
    <v-row>
      <v-col cols="10"
        ><br />
        รายระเอียด : {{ About }}<br /><br />
        อัพเดตล่าสุด : {{ Date(TimeUpdate) }}<br />
        เวลาที่สร้าง : {{ Date(TimeCreate) }}<br />
      </v-col>
      <v-col cols="2">
        <!-- Dialog แก้ไข  -->
        <v-row justify="center" v-if="user.adminUser">
          <v-dialog v-model="dialogEdit" persistent>
            <template v-slot:activator="{ props }"
              ><v-btn
                style="position: relative; top: 25px"
                color="error"
                @click="delL(id)"
              >
                ลบ
              </v-btn>
              <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
              <v-btn
                style="position: relative; top: 25px"
                v-bind="props"
                color="warning"
                @click="editL()"
              >
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
                    <!-- แก้ไขรูป -->
                    <v-col cols="12">
                      <!-- --- -->
                      <v-list>
                        <v-list-subheader
                          style="font-size: x-large; color: black"
                          >รูปภาพเดิม</v-list-subheader
                        >

                        <v-list-item
                          v-for="item in urlImgs"
                          :key="item.name"
                          :value="item.name"
                          active-color="primary"
                          :prepend-avatar="item.url"
                        >
                          <v-list-item-title>{{ item.name }}</v-list-item-title>

                          <template v-slot:append>
                            <v-switch
                              v-model="eDelPhoto"
                              color="error"
                              label="ลบ"
                              :value="item.name"
                              hide-details
                            ></v-switch>
                          </template>
                        </v-list-item>
                      </v-list>
                      <!-- list -->
                    </v-col>
                    <!-- --------- -->
                    <v-col cols="12">
                      <v-file-input
                        prepend-icon=""
                        multiple
                        accept="image/*"
                        label="เพิ่มรูปสถานที่"
                        v-model="eNewPhoto"
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
                <small></small>
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
        >จองโดย</v-list-subheader
      >

      <v-list-item
        v-for="(item, i) in listL"
        :key="i"
        :value="item"
        active-color="primary"
      >
        <v-row>
          <v-col cols="1"
            ><!-- แก้ให้สวย -->
            <v-avatar class="mr-4" :color="item.color">{{ item.n }} </v-avatar>
            <!-- แก้ให้สวย --></v-col
          >
          <v-col cols="11"
            ><v-list-item-title>{{ item.byName }}</v-list-item-title>

            <v-list-item-subtitle>
              Start :{{ item.StartDate }} - {{ item.StartTime }}<br />
              End :{{ item.EndDate }} - {{ item.EndTime }}<br />

              About :{{ item.About }}<br /> </v-list-item-subtitle
          ></v-col>
        </v-row>

        <template v-slot:append>
          <v-btn
            v-if="user.uid == item.by || user.adminUser"
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
    <v-row justify="center" v-if="user.loginUser">
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
            <span class="text-h5">จองสถานที่</span>
          </v-card-title>
          <v-card-subtitle>
            ชื่อ : {{ Name }}<br />
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
            <small></small>
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
import { db, stringToColour } from "../DB";
import { useUserStore } from "@/stores/user";
import router from "../router";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

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
      model1: 0,
      dialogEdit: false, //แก้ไขโลเคชั่น
      id: this.$route.params.id, // ไอดี โลเคชั่นจาก url
      urlImgs: [], //url ims ของโลเคชั่น

      Name: "", //ชื่อ โลเคชั่น
      Photo: [], // ชื่อรูปทั้งหมดโลเคชั่น
      About: "", // หมายเหตุ
      TimeCreate: 0,
      TimeUpdate: 0,

      eName: "", // ชื่อโลเคชั่น หน้าแก้ไข
      ePhoto: [], // ชื่อรูปทั้งหมดโลเคชั่น  หน้าแก้ไข
      eDelPhoto: [],
      eNewPhoto: [], //รูปใหม่ หน้าแก้ไข
      eAbout: "", // หมายเหตุ  หน้าแก้ไข
      eTimeUpdate: 0,

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
  computed: {
    avt() {
      return stringToColour(this.user.name);
    },
    listL: function () {
      function compare(a, b) {
        if (a.TimeCreate < b.TimeCreate) return -1;
        if (a.TimeCreate > b.TimeCreate) return 1;
        return 0;
      }
      const a = this.items;
      return a.sort(compare);
    },
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
    delPic(arrName = []) {
      arrName.forEach(async (name) => {
        console.log("ลบรูปชื่อ :" + name);
        const sgImgRef = ref(storage, "images/" + this.id + "/" + name);

        // Delete the file
        deleteObject(sgImgRef).then(() => {
          // File deleted successfully
          console.log("ลบรูปชื่อ :" + name + " ok");
        });

        const delIndex = this.ePhoto.indexOf(name);
        if (delIndex > -1) {
          // only splice array when item is found
          this.ePhoto.splice(delIndex, 1); // 2nd parameter means remove one item only
        }
        console.log("this.ePhoto :", this.ePhoto);
      });
    },
    async dialogEditSave() {
      // แก้ไข Location เมื่อเซฟ

      //ลบรูปเก่า
      this.delPic(this.eDelPhoto);

      //เพิ่มลูปใหม่
      // ชื่อของรูปภาพทั้งหมด

      const sgIdRef = ref(storage, "images/" + this.id);
      const eNewPhotoName = [];

      this.eNewPhoto.forEach(async (file) => {
        eNewPhotoName.push(file.name);

        const sgFileRef = ref(sgIdRef, file.name);
        uploadBytes(sgFileRef, file).then((snapshot) => {
          console.log("Uploaded : ", snapshot);
        });
      });

      await updateDoc(doc(db, "Location", this.id), {
        Name: this.eName,
        Photo: [...this.ePhoto, ...eNewPhotoName],
        About: this.eAbout,
        TimeUpdate: Date.now(),
      });
      this.dialogEditClose();
    },

    async del(id) {
      if (confirm("ยืนยันการลบ Reserve id:" + id + " ?")) {
        //del Reserve

        await deleteDoc(doc(db, "Reserve", id));
        console.log("del : " + id);
      }
    },
    async delL(id) {
      if (confirm("ยืนยันการลบ Location id:" + id + " ?")) {
        // Save it!
        // ลบรูปทีมีใน Location
        this.delPic(this.Photo);
        //del Location
        await deleteDoc(doc(db, "Location", id));
        router.push("/");
        console.log("del : " + id);
      } else {
        // Do nothing!
        console.log("ยกเลิกการลบ");
      }
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
          byName: this.user.name,
          byPic: this.user.pic,
          status: false,
          TimeCreate: Date.now(),
          TimeUpdate: Date.now(),
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
      if (doc.data()) {
        console.log(1);
        this.Name = doc.data().Name;
        this.Photo = doc.data().Photo;
        this.About = doc.data().About;
        this.TimeCreate = doc.data().TimeCreate;
        this.TimeUpdate = doc.data().TimeUpdate;

        this.urlImgs = [];
        this.Photo.forEach((name) => {
          const sgImgRef = ref(storage, "images/" + this.id + "/" + name);
          console.log(sgImgRef);
          // Get the download URL

          getDownloadURL(sgImgRef).then((url) => {
            // Insert url into an <img> tag to "download"
            this.urlImgs.push({ url, name, del: false });
          });
        });
        console.log(doc.data());
      } else {
        router.push("/");
      }
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
        const avt = stringToColour(doc.data().byName);
        console.log(avt);
        this.items.push({
          id: doc.id,
          title: doc.data().byName,
          color: avt.color,
          n: avt.name,
          ...doc.data(),
        });
      });
      //จัดเรียง
      this.items.sort((a, b) =>
        a.Name > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      // console.log(this.items);
    });
  },
};
</script>
