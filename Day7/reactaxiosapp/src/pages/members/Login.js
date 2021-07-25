import React, { useState } from "react";

import axios from "axios";

//dispatch관련) 리덕스 : 액션 실행 함수를 손쉅게 호출하기 위한 useDispatch훅을 참조한다.
import { useDispatch } from "react-redux";

//dispatch관련) 디스패치를 위한 리덕스 액션 실행 함수를 참조한다.
import { memberLogin } from "../../redux/actions";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    userpwd: "",
  });

  //dispatch관련) 전역 데이터 제어용 디스패치 상수 생성
  const globalDispatch = useDispatch();

  const onLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onLogin = () => {
    // 백엔드 로그인 후 사용자 정보와 토큰정보를 가져온다.
    axios
      .post("http://localhost:3005/api/member/login", login)
      .then((res) => {
        if (res.data.code === "200") {
          console.log("JWT토큰값: ", res.data.data.token);
          console.log("로그인 사용자 정보 : ", res.data.data.member);

          //토큰 저장 방법 2)웹 브라우저 로컬 스토리지에 토큰 값 보관하기 //로컬 스토리지에 보관하면 어떤 컴포넌트에서든 토큰 값 가질 수 있음(창을 닫아도 유지가 됨 : 개발자모드(F12) ->Application->storage에서 확인 가능 )
          window.localStorage.setItem("jwttoken", res.data.data.token);

          const storageToken = window.localStorage.getItem("jwttoken");
          console.log("브라우저 로컬 스토리지에 저장된 토큰 : ", storageToken);

          //토큰 저장 방법 1)
          //사용자 토큰 발급 후 백엔드 API 호출 시 발급된 JWT 토큰을 Ajax 헤더에 "x-access-token" 영역에 기본 포함시켜 백엔드 서비스를 호출하기 한다.
          //오픈API 사용 시 토큰이 있는 사람만 접근할 수 있게 하기 위함.
          axios.defaults.headers.common[
            "x-access-token"
          ] = `${res.data.data.token}`;

          //dispatch관련)globalDispatch(액션 생성 함수명 (액션 생성 함수에 전달된 데이터))
          globalDispatch(memberLogin(res.data.data.token));

          alert("정상 로그인 되었습니다.");
        } else {
          // 서버측 에러 메세지 출력
          alert(res.data.msg);
        }
      })
      .catch(() => {});
    // 가져온 정보를 전역 데이터 저장소에 전역스테이트 정보로 업데이트 한다.
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <span>메일 주소</span>
      <input
        type="text"
        name="email"
        value={login.email}
        onChange={onLoginChange}
      />
      <br></br>
      <span>암호</span>
      <input
        type="password"
        name="userpwd"
        value={login.userpwd}
        onChange={onLoginChange}
      />
      <br></br>
      <button onClick={onLogin}>로그인</button>
    </div>
  );
};

export default Login;
