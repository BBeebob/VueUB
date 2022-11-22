<template>
  <div class="LocationView">
    <h1>LocationView</h1>
    id : {{ id }} <br />
    Name : {{ Name }} <br />
    About : {{ About }}<br />
  </div>
</template>

<script>
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../DB";
export default {
  name: "LocationView",
  setup() {
    // const user = useUserStore();
    // return { user };
  },
  data() {
    return {
      id: this.$route.params.id,
      Name: "",
      About: "",
    };
  },
  mounted() {
    const unsub = onSnapshot(doc(db, "Location", this.id), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      this.Name = doc.data().Name;
      this.About = doc.data().About;
    });
    console.log(unsub);
  },
};
</script>
