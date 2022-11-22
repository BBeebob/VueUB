<template>
  <div class="LocationView">
    <h1>LocationView</h1>
    id : {{ id }} <br />
    Name : {{ Name }} <br />
    About : {{ About }}<br />

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
          <v-card-subtitle> Name : {{ Name }} </v-card-subtitle>
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
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../DB";
export default {
  name: "LocationView",
  setup() {
    // const user = useUserStore();
    // return { user };
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
    async dialogSave() {
      console.log("dialogSave");
      console.log(this.dlgStartDate);
      console.log(this.dlgStartTime);

      try {
        const docRef = await addDoc(
          collection(db, "Location", this.id, "Reserve"),
          {
            StartDate: this.dlgStartDate,
            StartTime: this.dlgStartTime,
            EndDate: this.dlgEndDate,
            EndTime: this.dlgEndTime,

            About: this.dlgAbout,
          }
        );

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
  mounted() {
    // const unsub =
    onSnapshot(doc(db, "Location", this.id), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      this.Name = doc.data().Name;
      this.About = doc.data().About;
    });
    // console.log(unsub);
  },
};
</script>
