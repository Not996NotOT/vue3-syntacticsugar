import { Container, injectable } from "inversify";
import { createApp, isRef, ref } from "vue";
import App from "./App";
import router from "./router";
import "reflect-metadata";

//自动注入ref
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

//声明接口
export interface ICounterController {
  counter: number;
  name: string;
  increment: () => void;
}

//实现接口
@injectable()
export class CounterController implements ICounterController {
  counter: number;
  name: string;
  constructor() {
    this.counter = 1;
    this.name = "";
    //类似于mobx 自动注入ref给每个property
    makeAutoObservable(this);
  }
  increment = () => {
    this.counter++;
  };
}

//声明注入枚举
export enum IOCTypes {
  ICounterController = "ICounterController",
}

export const IOC = new Container();
//依赖注入，绑定接口，取实例枚举，具体注入类型
IOC.bind<ICounterController>(IOCTypes.ICounterController).to(CounterController);

createApp(App).use(router).mount("#app");
