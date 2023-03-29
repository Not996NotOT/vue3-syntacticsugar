import { ShallowUnwrapRef } from "vue";
import { Options, setup, Vue } from "vue-class-component";
import "reflect-metadata";
import { ICounterController, IOC, IOCTypes } from "@/main";


@Options({})
class CounterView extends Vue {
  //从ioc容器里面拿,接口声明=实例引用，实例在ioc容器里面
  controller: ShallowUnwrapRef<ICounterController> = setup(() =>
    IOC.get(IOCTypes.ICounterController)
  );
  render() {
    return (
      <button onClick={this.controller.increment}>
        {this.controller.counter}
      </button>
    );
  }
}

export default CounterView;
