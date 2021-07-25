import logo from "./logo.svg";
import "./App.css";

//라우팅을 위한 Router 객체를 참조한다.
import { Route, Link } from "react-router-dom";

//화면 컴포넌트를 참조한다.
import Home from "./Home";
import About from "./About";

import Profile from "./Profile";

import Profiles from "./Profiles";

import About2 from "./About2";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about?detail=true&qid=aaaaaa">회사소개</Link>
        </li>
        <li>
          <Link to="/company?qid=bbbb">회사소개2-company</Link>
        </li>
        <li>
          {/* profile 라우팅 주소에 user1이라는 파라메터 전달 */}
          <Link to="/profile/user1">회원소개</Link>
        </li>
        <li>
          <Link to="/about2?detail=true&qid=aaaaaa">회사소개</Link>
        </li>
      </ul>
      <hr></hr>

      {/* Route 객체의 path는 routing 주소를 정의하고 해당 주소를 브라우저에서 조회하면 해당 지정된 컴포넌트가 App에 노출된다. */}

      {/* /about 경로는 기본적으로 /경로를 포함하고 있어 홈과 회사소개 컴포넌트가 둘 다 나타나게 된다.
      홈 컴포넌트 라우팅 예약propst 중에 exact값을 true로 설정하게 되면 /만 표기했을 때만 홈이 나타나게 된다.  */}
      <Route path="/" component={Home} exact={true}></Route>
      {/* 동일한 화면 컴포넌트를 여러 개의 라우팅 주소로 서비스할 수 있다. */}
      <Route path="/company" component={About}></Route>
      <Route path="/about" component={About}></Route>

      <Route path="/about2" component={About2}></Route>

      {/* URL주소에 포함시켜 전달할 파라메터 값에 대해 와일드카드로 파라메터명을 명시한다. */}
      <Route path="/profile/:username" component={Profile}></Route>

      {/* 서브 라우팅 예제 컴포넌트 */}
      <Route path="/profiles" component={Profiles}></Route>
    </div>
  );
}

export default App;
