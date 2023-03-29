import { useEffect, useState } from "@/utils/ReactHook";
import { Ref, ref, watchEffect, watch, defineComponent } from "vue";

const useCounter = () => {
  const [counter, setCounter] = useState<number>(0);
  const increment = () => setCounter(++counter.value);
  useEffect(() => {
    setCounter(100);
  }, []);
  return {
    increment,
    counter,
  };
};

export default defineComponent({
  setup() {
    const { counter, increment } = useCounter();
    return () => <button onClick={increment}>{counter}</button>;
  },
});
