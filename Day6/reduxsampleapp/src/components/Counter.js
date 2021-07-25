import React, { useState } from "react";
//subscribe관련) 리덕스 : 구독을 위한 useSelector 참조한다.
import { useSelector } from "react-redux";
import Todos from "./Todos";
const Counter = () => {
  //const [todoCount, setTodoCount] = useState(0);

  //전역 데이터 저장소에 있는 todoCount 속성값을 조회한다.
  //전역 데이터 저장소의 값에 접근하기 위해서는 useSelector((전역 저장소 접근자=>전역 저장소 접근자.리듀서 함수명.리듀서 함수의 state속성값 호출)
  const todoCnt = useSelector((state) => state.ToDo.todoCount);
  return (
    <div>
      <h1>할 일 건수 : {todoCnt}</h1>
      <br></br>
      <br></br>
    </div>
  );
};

export default Counter;
