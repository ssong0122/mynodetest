import React, { useState } from "react";

import axios from "axios";

import { useHistory } from "react-router";

//각 종 유틸리티 함수를 참조한다.
import {
  getJWTToken,
  isMemberLogined,
  getLoginMember,
} from "../../helpers/authUtils";

const MemberRegist = () => {
  const [member, setMember] = useState({
    email: "",
    userpwd: "",
    nickname: "",
    telephone: "",
    username: "",
    entrytype: "1",
    photo: "",
  });

  const history = useHistory();

  //로그인 여부 체크
  const isLogin = isMemberLogined();
  //로그인이 안 된 상태로 회원 등록 페이지에 왔을 경우 로그인 할 수 있게 로그인 페이지로 보냄
  if (isLogin === false) {
    history.push("/login");
  }

  const onMemberChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    //회원 정보 저장하기
    axios
      .post("http://localhost:3005/api/member", member)
      .then((res) => {
        console.log("데이터 처리 결과 : ", res.data);
        alert("회원 등록 완료");
        history.push("/member/list");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>회원 등록 페이지</h1>
      이메일:
      <input
        type="text"
        name="email"
        value={member.email}
        onChange={onMemberChange}
      />
      <hr></hr>
      암호:
      <input
        type="text"
        name="userpwd"
        value={member.userpwd}
        onChange={onMemberChange}
      />
      <hr></hr>
      닉네임:
      <input
        type="text"
        name="nickname"
        value={member.nickname}
        onChange={onMemberChange}
      />
      <hr></hr>
      전화번호:
      <input
        type="text"
        name="telephone"
        value={member.telephone}
        onChange={onMemberChange}
      />
      <hr></hr>
      이름:
      <input
        type="text"
        name="username"
        value={member.username}
        onChange={onMemberChange}
      />
      <hr></hr>
      <button onClick={onSave}>저장</button>
    </div>
  );
};

export default MemberRegist;
