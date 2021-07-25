//반드시 useState참조
import React, { useState } from "react";

const UseStateHook = () => {
  //useState 데이터 구조정의 및 값 초기화
  //주로 useState는 해당 컴포넌트 내에서만 사용되는 데이터의 구조를 정의하고
  //그 값을 초기화하며 해당 데이터를 이용해 화면 HTML을 렌더링한다.
  //주로 화면상에서 사용자 데이터를 입력받거나 화면에 출력할떄 이용합니다.

  //카운터 숫자값 표현
  //자동 증감 숫자형 형식 데이터 구조를 정의하고 0으로 초기화 한다.
  const [value, setValue] = useState(0);

  //단일 사용자 데이터 구조를 정의하고 초기값 설정하기
  const [user, setUser] = useState({ userid: "", username: "", email: "" });

  //사용자 목록 배열 구조 정의 및 초기화
  const [userList, setUserList] = useState([]);

  //이벤트 처리 함수 정의

  //증가 이벤트 처리 함수
  const Increase = () => {
    setValue(value + 1);
  };

  //감소 이벤트 처리 함수
  const Decrease = () => {
    setValue(value - 1);
  };

  //사용자가 모든 입력 요소에 값을 변경할 때마다 바로 관련 state에 값을 반영한다.

  const onUserDataChange = (e) => {
    //spread연산자를 통해 user state 복사본을 만들고 ui 요소의 name에 지정된 속성에 대해서 입력값으로 값을 적용해준다.
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //현재 단일 사용자 정보를 배열에 추가한다.
  const onSaveData = () => {
    //배열에 concat을 사용하지 않고 배열의 복사본을 만드는 spread 연산자를 이용해 복사본 배열에 단일 사용자 객체를 추가한다.
    setUserList([...userList, user]);

    console.log("사용자 배열 :", userList);
  };

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      {/* 직접 이벤트 핸들러 영역에서 setter함수를 호출할 수도 있고,
            별도의 이벤트 핸들러 함수를 정의해 호출할 수도 있다. */}
      <button onClick={() => setValue(value + 1)}>1증가</button>
      <button onClick={() => setValue(value - 1)}>1감소</button>
      {/* 이벤트 처리기 함수를 호출하여 로직을 처리하는 경우 */}
      <button onClick={Increase}>1증가</button>
      <button onClick={Decrease}>1감소</button>
      <hr></hr>
      userId:
      <input
        type="text"
        name="userid"
        value={user.userid}
        onChange={onUserDataChange}
      />
      {user.userid}
      <br></br>
      username:
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={onUserDataChange}
      />
      {user.username}
      <br></br>
      email:
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={onUserDataChange}
      />
      {user.email}
      <br></br>
      <button onClick={onSaveData}>저장</button>
      {userList.map((item, i) => (
        <li key={i}>
          {i} {item.userid} - {item.username} - {item.email} {""}
        </li>
      ))}
    </div>
  );
};

export default UseStateHook;
