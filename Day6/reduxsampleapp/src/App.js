import logo from "./logo.svg";
import "./App.css";

import Todos from "./components/Todos";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      <Counter></Counter>
      <hr></hr>
      <Todos></Todos>
    </div>
  );
}

export default App;
