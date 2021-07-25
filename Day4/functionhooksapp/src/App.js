import logo from "./logo.svg";
import "./App.css";

import UseStateHook from "./UseStateHook";
import UseEffectHook from "./UseEffectHook";
import UseReducerHook from "./UseReducerHook";
import UseMemo from "./UseMemo";
import UseCallbackHook from "./UseCallbackHook";
function App() {
  return (
    <div>
      {/* 
      <UseStateHook></UseStateHook>
      <hr></hr>
      <UseEffectHook></UseEffectHook>
      <hr></hr>
      <UseReducerHook></UseReducerHook>
      <hr></hr>
      <UseMemo></UseMemo>
       */}
      <UseCallbackHook></UseCallbackHook>
    </div>
  );
}

export default App;
