import { Container } from "inversify";
import { Options, Vue } from "vue-class-component";


@Options({})
class App extends Vue {
  render() {
    return (
      <>
        <nav></nav>
        <router-view />
      </>
    );
  }
}

export default App;
