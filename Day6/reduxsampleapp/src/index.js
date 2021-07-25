import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Store 탑재를 위한 Provider 객체와 store 구성(생성) 메소드를 참조한다.
import { Provider } from "react-redux";
import { configureStore } from "./redex/store";

//Provider 컴포넌트는 리액트 최상위 컴포넌트인 App컴포넌트와 Store의 연결을 제공하는 컴포넌트임
//Provider 하위에 존재하는 모든 UI 컴포넌트에서는 Store접근이 가능해진다.
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
