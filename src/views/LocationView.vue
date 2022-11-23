<template>
  <div class="LocationView">
    <h1>LocationView</h1>
    id : {{ id }} <br />
    Name : {{ Name }} <br />
    About : {{ About }}<br />

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
  // updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../DB";
import { useUserStore } from "@/stores/user";

export default {
  name: "LocationView",
  setup() {
    const user = useUserStore();
    return { user };
  },
  data() {
    return {
      dialog: false,

      id: this.$route.params.id,
      Name: "",
      About: "",

      items: [
        // { type: "subheader", title: "สถานที่" }
      ],
      dlgAbout: "5555",

      dlgStartDate: "",
      dlgStartTime: "",
      dlgEndDate: "",
      dlgEndTime: "",
    };
  },
  methods: {
    async del(id) {
      console.log("no : " + id);
      //del
      await deleteDoc(doc(db, "Reserve", id));
    },
    async dialogSave() {
      console.log("dialogSave");

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
      console.log("dialogClose");
      this.dialog = false;
    },
  },
  mounted() {
    // const unsub =
    onSnapshot(doc(db, "Location", this.id), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      this.Name = doc.data().Name;
      this.About = doc.data().About;
    });
    // console.log(unsub);

    //----------
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
      console.log(this.items);
    });
  },
};
</script>
