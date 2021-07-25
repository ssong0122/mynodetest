//jwt 토큰 티코딩 패키지 참조
import jwtDecode from "jwt-decode";

//사용자 인증 토큰 조회하기 유틸 함수
const getJWTToken = () => {
  const storageToken = window.localStorage.getItem("jwttoken");
  if (storageToken != undefined) {
    return storageToken;
  } else {
    return "";
  }
};

//현재 사용자 로그인 여부 체크 함수
const isMemberLogined = () => {
  const storageToken = window.localStorage.getItem("jwttoken");
  console.log("로그인 상태 체크 토큰 =====>", storageToken);
  if (storageToken != null) {
    return true;
  } else {
    return false;
  }
};

//JWT 토큰 기반 로그인 사용자 정보 추출 함수
const getLoginMember = () => {
  const storageToken = window.localStorage.getItem("jwttoken");

  if (storageToken == undefined) {
    return null;
  }

  //토큰에서 디코딩된 값을 추출한다.
  const decoded = jwtDecode(storageToken);

  const member = { email: decoded.email, username: decoded.username }; //TopMenu에서 호출할 때 함수명.email , 함수명.username 이렇게 호출해야겠쥬

  return member;
};

//모듈로 출력하기
export { getJWTToken, isMemberLogined, getLoginMember };
