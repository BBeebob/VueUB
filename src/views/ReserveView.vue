<template>
  <div class="Reserve">
    <br />
    <h1 class="d-flex flex-column justify-space-between align-center">
      รายการขอจอง
    </h1>

    <!-- --- -->
    <v-list lines="three">
      <v-list-subheader
        style="font-size: x-large; color: black"
      ></v-list-subheader>

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
            ><v-list-item-title>{{ item.nameL }}</v-list-item-title>

            <div>
              เริ่ม :{{ item.StartDate }} - {{ item.StartTime }}<br />
              ถึง :{{ item.EndDate }} - {{ item.EndTime }}<br />
              หมายเหตุ :{{ item.About }}<br />

              จองโดย :{{ item.title }}<br />
              ส่งเมื่อ :{{ new Date(item.TimeCreate) }}<br /></div
          ></v-col>
        </v-row>

        <template v-slot:append>
          <v-btn
            color="blue"
            icon="mdi-information"
            variant="text"
            @click="yes(item.id, item)"
          ></v-btn>
          <v-btn
            color="red"
            icon="mdi-information"
            variant="text"
            @click="no(item.id)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <!-- list -->
  </div>
</template>
<script>
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, stringToColour } from "../DB";
import router from "../router";

export default {
  setup() {
    //     const user = useUserStore();
    // return { user };
  },
  name: "LocationView",
  data() {
    return {
      items: [
        // { type: "subheader", title: "สถานที่" }
      ],
    };
  },
  computed: {
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
    async yes(id, data) {
      // ยืนยันการจอง
      if (confirm("ยืนยันการจอง Reserve id:" + id + " ?")) {
        console.log("yes : " + id);
        await updateDoc(doc(db, "Reserve", id), {
          status: true,
        });
        router.push("/location/" + data.idL);
      }
    },
    async no(id) {
      //ยกเลิกการจอง
      if (confirm("ยืนยันการลบ Reserve id:" + id + " ?")) {
        this.noAuto(id);
      }
    },
    async noAuto(id) {
      //ยกเลิกการจอง

      await deleteDoc(doc(db, "Reserve", id));
    },
  },
  mounted() {
    // เมื่อเปิดหน้า ดึงข้อมูล Reserve ที่ยังไม่ยืนยันมาแสดง
    const q = query(collection(db, "Reserve"), where("status", "==", false));
    // const unsubscribe =
    onSnapshot(q, (querySnapshot) => {
      this.items = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const avt = stringToColour(doc.data().byName);

        //ตรวจสอบว่าเกินเวลารึปล่าว

        const d = new Date();
        const dE = new Date(doc.data().EndDate + " " + doc.data().EndTime);

        if (dE < d) {
          //ถ้าเกินให้ลบ
          this.noAuto(doc.id);
        } else {
          //ถ้าไม่เกินให้แสดงปกติ
          this.items.push({
            id: doc.id,
            title: doc.data().byName,
            color: avt.color,
            n: avt.name,
            ...doc.data(),
          });
        }
      });
      //จัดเรียง

      // this.items.sort((a, b) =>
      //   a.Name > b.title ? 1 : b.title > a.title ? -1 : 0
      // );
      // console.log(this.items);
    });
  },
};
</script>
