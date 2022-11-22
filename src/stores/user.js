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

export const useUserStore = defineStore("user", {
  state: () => ({
    uid: "",
    name: "5555",
    email: "",
  }),
  getters: {
    loginUser: (state) => state.uid !== "",
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
});