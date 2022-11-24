// import { ref, computed } from "vue";
import { defineStore } from "pinia";

// export const useCounterStore = defineStore('root', () => {
//   const userLogin = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

// std.62122420108@ubru.ac.th
// 080808088850085

// export const useUserStore = defineStore("user", () => {
//   const uid = ref("55");
//   const name = ref("");
//   const email = ref("");

//   const loginUser = computed(() => uid.value !== "");

//   return { uid, name, email, loginUser };
// });

//ข้อมูลผู้ใช้เมื่อเข้าสู้ระบบ
export const useUserStore = defineStore("user", {
  state: () => ({
    uid: "",
    name: "5555",
    email: "",
  }),
  getters: {
    loginUser: (state) => state.uid !== "",
    // std.62122420108@ubru.ac.th
    adminUser: (state) => state.email == "std.62122420108@ubru.ac.th",
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
});
