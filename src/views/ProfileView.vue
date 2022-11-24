<template>
  <div>
    <h1>Profile</h1>
    <div>ชื่อ : {{ user.name }}</div>
    <div>e-mail : {{ user.email }}</div>
    <div>faculty : {{ user.faculty }}</div>
    <div>phonenumber : {{ user.phonenumber }}</div>
  </div>
</template>
<script>
import { useUserStore } from "../stores/user";

export default {
  name: "ProfilePage",
  setup() {
    const user = useUserStore();
    return { user };
  },
  methods: {},
};
</script>
