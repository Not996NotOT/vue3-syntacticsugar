import { defineComponent, ref,isRef } from "vue";



export default defineComponent({
  setup() {
    const counter = ref(0);
    const increment = () => counter.value++;
    return () => <button onClick={increment}>{counter}</button>;
  },
});
