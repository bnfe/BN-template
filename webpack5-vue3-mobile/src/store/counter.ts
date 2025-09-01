// 选项式
// import { defineStore } from "pinia";

// export const useCounterStore = defineStore("counter", {
//   state: () => {
//     return { count: 0 };
//   },
//   // 也可以这样定义
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
//   getters: {
//     doubleCount: state => state.count * 2,
//   },
// });

// 组合式
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };
  return { count, doubleCount, increment };
});
