<template>hello world</template>

<script>
import { defineComponent } from "vue";
import { db } from "../DB";
import { doc, setDoc } from "firebase/firestore";

//  Components

await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
});

export default defineComponent({
  name: "HomeView",

  components: {},
});
</script>
