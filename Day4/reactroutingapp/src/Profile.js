import React from "react";

import UseHistoryHook from "./UseHistoryHook";

//전역 데이터 목록 정의
const data = {
  user1: {
    name: "사용자1",
    description: "학생입니다.",
  },
  user2: {
    name: "사용자2",
    description: "교수입니다.",
  },
};

const Profile = ({ match }) => {
  //URL파라메터에서 username값을 추출해서 username에 할당한다.
  //ex) user1
  const { username } = match.params;

  //파라메터로 전달된 username값을 키로 data에서 지정 사용자 정보를 추출한다.
  const profile = data[username];

  //profile값이 존재하지 않으면
  if (!profile) {
    return <div>사용자 정보가 존재하지 않습니다.</div>;
  }

  return (
    <div>
      <h3>
        {/* 전달된 파라메터 정보와 선택된 사용자 이름을 출력한다. */}
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>

      <UseHistoryHook></UseHistoryHook>
    </div>
  );
};

export default Profile;
