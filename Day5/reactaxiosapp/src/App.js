import logo from "./logo.svg";
import "./App.css";

//라우팅을 위한 Router 객체를 참조한다.
import { Route, Link } from "react-router-dom";

//각종 재사용 컴포넌트에 대한 참조
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";

//각종 페이지 컴포넌트에 대한 참조
import Main from "./pages/Main";
import About from "./pages/About";
import Login from "./pages/Login";

import ArticleList from "./pages/articles/ArticleList";
import ArticleModify from "./pages/articles/ArticleModify";
import ArticleRegist from "./pages/articles/ArticleRegist";

import MemberList from "./pages/members/MemberList";
import MemberRegist from "./pages/members/MemberRegist";
import MemberModify from "./pages/members/MemberModify";

function App() {
  return (
    <div>
      <TopMenu></TopMenu>
      <Route path="/" component={Main} exact={true}></Route>
      <Route path="/article/list" component={ArticleList}></Route>
      <Route path="/article/regist" component={ArticleRegist}></Route>
      <Route path="/article/modify/:idx" component={ArticleModify}></Route>
      {/* querystring으로 넘어오는 거 처리하려고 했는데 다음에 하자..
      <Route path="/article/modify/" component={ArticleModify}></Route> */}

      <Route path="/member/list" component={MemberList}></Route>
      <Route path="/member/regist" component={MemberRegist}></Route>
      <Route path="/member/modify/:idx" component={MemberModify}></Route>

      <Route path="/member/login" component={Login}></Route>
      <Route path="/about" component={About}></Route>
      <Footer></Footer>
    </div>
  );
}

export default App;
