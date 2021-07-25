import React, { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

//리덕스 : 구독을 위한 useSelector 훅 참조
import { useSelector } from "react-redux";

//각 종 유틸리티 함수를 참조한다.
import {
  getJWTToken,
  isMemberLogined,
  getLoginMember,
} from "../helpers/authUtils";

const TopMenu = () => {
  //(state-최상위 전역 데이터 객체=> state.리듀서 함수. 리듀서 함수내 데이터 속성)
  const token = useSelector((state) => state.Login.token);

  const history = useHistory();

  //사용자 로그아웃 처리 - 로컬 스토리지를 삭제한다.
  const logOut = () => {
    window.localStorage.removeItem("jwttoken");
    //history.push("/"); //로그아웃 후 메인으로 이동

    window.location = "/"; //이렇게 하면 모든 데이터가 없어져서 이렇게 하면 안 되지만 일단은 이렇게...
  };

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
        {isMemberLogined() == true ? ( //처음에 토큰으로 받아올 때 작성한 코드  ==>  token != undefined : token 값이 존재한다면
          <button onClick={logOut}>로그아웃</button>
        ) : (
          <Link to="/login">로그인</Link>
        )}
        <hr></hr>
        {isMemberLogined() == true ? (
          <b>로그인 된 상태입니다. </b>
        ) : (
          <b>로그인 안 된 상태입니다. </b>
        )}
        현재 로그인 토큰 값 : {token}
        {/* 넘어온 값이 없으면 빈 문자열/ 있으면 넘어온 값 중 username  */}
        현재 접속 사용자 이름 :
        {getLoginMember() == null ? "" : getLoginMember().username}
      </span>
    </div>
  );
};

export default TopMenu;
