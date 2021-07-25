import React from "react";

import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div style={{ width: "100%", height: "50px", backgroundColor: "gray" }}>
      <span>
        <Link to="/">홈</Link>
      </span>
      &nbsp;
      <span>
        <Link to="/about">회사 소개</Link>
      </span>
      &nbsp;
      <span></span>
      <span>
        <Link to="/article/list">게시글 목록</Link>
      </span>
      &nbsp;
      <span>
        <Link to="/member/list">
          <span>회원 목록</span>
        </Link>
      </span>
      &nbsp;
      <span>
        <Link to="/member/login">로그인</Link>
      </span>
    </div>
  );
};

export default TopMenu;
