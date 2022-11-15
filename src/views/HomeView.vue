<template>hello world</template>

<script>
import { defineComponent } from "vue";
import { db } from "../DB";

//  Components

const data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
};

// Add a new document in collection "cities" with ID 'LA'
const res = await db.collection("cities").doc("LA").set(data);
console.log(res);

db.collection;

export default defineComponent({
  name: "HomeView",

  components: {},
});
</script>
