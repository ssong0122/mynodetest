import React from "react";

//querystring 패키지 참조
import qs from "qs";

//리액트에서 URL QueryString값을 쉽게 추출하기 위해 qs 노드 패키지를 프로젝트에 추가 설치한다.
//yarn add qs

//회사 소개 화면 컴포넌트
const About = ({ location }) => {
  //qs.parse(URL내 querystring 문자열을 파싱하여 key값으로 추출할 수 있게 query 결과물을 생성한다.);
  //ex) ?test=a&uid=test&stock=3
  //ignoreQueryPrefix:true 이면 상기 query문자열에서 ?을 제거하는 것
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  //query조회 결과값이 문자열로 반환된다.
  //?detail=aaa 일 때, showDetail 값은 aaa가 된다.
  //query.쿼리값을 지정해 해당 값을 추출하고 문자열로 해당값을 받는다.
  //query.detail 값을 무조건 문자열 ture로 변환.
  const showDetail = query.detail === "true";
  const qid = query.qid;

  return (
    <div>
      <h1>회사 소개</h1>
      <p>회사소개 페이지입니다. </p>
      <p>{showDetail && <p>detail 값을 true로 설정했네요.</p>}</p>
      <p>전달 파라메터 QID = {qid}</p>
    </div>
  );
};

export default About;
