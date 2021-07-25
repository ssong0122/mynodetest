import React, { useState, useMemo } from "react";

//컴포넌트 라우팅 및 화면이동 제어를 위한 신규 라우팅 훅 기능 제공
//useHistory, useLocation 신규 hook 제공
import { useHistory, useLocation } from "react-router-dom";

const UseHistoryHook = () => {
  //history 상수 정의
  const history = useHistory();

  //현재 보고 있는 브라우저의 URL 주소/PARAMS/QueryString값을 쉽게 추출/ 제어할 수 있는 훅 제공
  const location = useLocation();

  const onMoveToCompany = () => {
    history.push("/company");
  };
  return (
    <div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        홈 이동
      </button>
      <button onClick={onMoveToCompany}>회사소개 이동</button>

      <button
        onClick={() => {
          history.push({ pathname: "/about", search: "?qid=vvvvvv" });
        }}
      >
        회사소개 이동 with QueryString
      </button>
    </div>
  );
};

export default UseHistoryHook;
