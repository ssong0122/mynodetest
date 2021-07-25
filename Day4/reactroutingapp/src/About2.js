import React from "react";

//라우팅 URL 주소 정보를 손쉽게 다룰 수 있는 useLocation 신규 훅 참조
import { useLocation } from "react-router-dom";
const About2 = () => {
  const location = useLocation();
  return <div>전체 쿼리스트링 문자열 : {location.search}</div>;
};

export default About2;
