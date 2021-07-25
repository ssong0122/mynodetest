import React, { useEffect, useState } from "react";

import axios from "axios";

import { useHistory } from "react-router";

const MemberList = () => {
  const [memberList, setMemberList] = useState([]); //서버에서 가져올 거니까 빈 배열로

  //useHistory 사용
  const history = useHistory();

  //최초 컴포넌트가 랜더링 될 때 백엔드에서 사용자 목록 데이터를 가져온다.
  useEffect(() => {
    //axios로 사용자 목록을 호출한다.
    axios
      .get("http://localhost:3005/api/member")
      .then((res) => {
        console.log("백엔드에서 제공된 회원 전체 데이터 : ", res);
        if (res.data.code === "200") {
          //백엔드 회원 목록 데이터 바인딩 처리
          setMemberList(res.data.data);
        } else {
          alert("백엔드 에러 발생");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1>회원 목록 페이지</h1>

      <button
        onClick={() => {
          history.push("/member/regist");
        }}
      >
        회원 등록
      </button>

      <table>
        <thead>
          <tr>
            <th>고유번호</th>
            <th>메일주소</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>가입일시</th>
          </tr>
        </thead>

        <tbody>
          {memberList.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.telephone}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
