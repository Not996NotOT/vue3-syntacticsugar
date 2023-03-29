import { ref, isRef } from "vue";
import { Options, setup, Vue } from "vue-class-component";

const makeAutoObservable = (target: any) => {
  Object.getOwnPropertyNames(target).forEach((propertyKey) => {
    if (typeof target[propertyKey] !== "function") {
      if (!isRef(target[propertyKey])) {
        const refProperty = ref(target[propertyKey]);
        Object.defineProperty(target, propertyKey, {
          set: (v) => (refProperty.value = v),
          get: () => refProperty.value,
        });
      }
    }
  });
};

class CounterViewModel {
  counter: number;
  name: string;
  constructor() {
    this.counter = 1;
    this.name = "";
    makeAutoObservable(this);
  }
  increment = () => {
    this.counter++;
  };
  changeName = () => {
    this.name = "zhangxing";
  };
}

@Options({})
class InjectClassComponentRef extends Vue {
  counter = setup(() => new CounterViewModel());
  render() {
    return <button onClick={this.counter.increment}>{this.counter.counter}</button>;
  }
}

export default InjectClassComponentRef;
