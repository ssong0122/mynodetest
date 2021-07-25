import React from "react";

import { Link, Route } from "react-router-dom";

// 자식 컴포넌트 참조
import Profile from "./Profile";
import WithRouterSample from "./WithRouterSample";

//이미 라우팅된 컴포넌트 안에서 다른 컴포넌트를 라우팅할 수 있다.
//SubRouting을 이용해 라우팅된 컴포넌트 안에서 서브 라우팅을 실시한다.
const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <Link to="/profiles/user1">user1</Link>
        </li>
        <li>
          <Link to="/profiles/user2">user2</Link>
        </li>
      </ul>

      {/* 서브 라우팅을 이용해 지정 컴포넌트를 로딩한다. */}
      <Route path="/profiles/:username" component={Profile}></Route>

      <WithRouterSample></WithRouterSample>
    </div>
  );
};

export default Profiles;
