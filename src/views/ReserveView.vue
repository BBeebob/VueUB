<template>
  <div class="Reserve">
    <h1>Reserve</h1>

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
      >
        <v-list-item-title>{{ item.nameL }}</v-list-item-title>

        <v-list-item-subtitle>
          Start :{{ item.StartDate }} - {{ item.StartTime }}<br />
          End :{{ item.EndDate }} - {{ item.EndTime }}<br />

          About :{{ item.About }}<br />
          by :{{ item.by }}<br />
        </v-list-item-subtitle>
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
import { db } from "../DB";
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
  methods: {
    async yes(id, data) {
      console.log("yes : " + id);
      await updateDoc(doc(db, "Reserve", id), {
        status: true,
      });
      router.push("/location/" + data.idL);
    },
    async no(id) {
      console.log("no : " + id);
      //del
      await deleteDoc(doc(db, "Reserve", id));
    },
  },
  mounted() {
    //
    const q = query(collection(db, "Reserve"), where("status", "==", false));
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
