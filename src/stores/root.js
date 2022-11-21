// import { ref, computed } from 'vue'
import { defineStore } from "pinia";

// export const useCounterStore = defineStore('root', () => {
//   const userLogin = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useRootStore = defineStore("root", {
  state: () => ({
    loginUser: false,
  }),

  actions: {
    login() {
      this.loginUser = true;
      console.log(".....root login");
    },
    logout() {
      this.loginUser = false;
      console.log(".....root logout");
    },
  },
});
