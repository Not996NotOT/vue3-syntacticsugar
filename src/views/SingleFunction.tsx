import { useEffect, useState } from "@/utils/ReactHook";

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

const useSingleCounter = (() => useCounter())();

//lazy
const singleCounter = (() => {
  let _instance;
  if (_instance == null) {
    _instance = useCounter();
  }
  return _instance;
})();

