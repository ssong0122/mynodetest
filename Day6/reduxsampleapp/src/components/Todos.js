import React, { useState } from "react";

//dispatch관련) 리덕스 : 액션 실행 함수를 손쉅게 호출하기 위한 useDispatch훅을 참조한다.
import { useDispatch } from "react-redux";

//dispatch관련) 디스패치를 위한 리덕스 액션 실행 함수를 참조한다.
import { addTodoList } from "../redex/todos/actions";

const Todos = () => {
  //단일 할 일 정보 데이터 구조 정의 및 초기값 세팅
  const [todo, setTodo] = useState({
    title: "",
    order: 0,
  });

  //할 일 목록 : 현재는 해당 컴포넌트에서 관리하지만 추후에는 전역 데이터로 이관 예정
  const [todoList, setTodoList] = useState([]);

  //dispatch관련) 전역 데이터 제어용 디스패치 상수 생성
  const globalDispatch = useDispatch();

  //할 일 데이터 바인딩 함수
  const onTodoChange = (e) => {
    setTodo({ ...todo, [e.target.name]: [e.target.value] });
  };

  //할 일 추가 함수
  const onAddTodo = () => {
    setTodoList([...todoList, todo]);

    console.log("현재 추가된 할 일 카운트 : ", todoList.length);

    //dispatch관련)
    //전역 할 일 목록 카운트 정보에 액션 생성 함수를 호출하여 전역 카운트를 갱신시킨다.
    //globalDispatch를 이용해 참조한 addTodoList() 액션 생성 함수를 호출한다.
    //addTodoList액션 함수 호출 시 액션에 전달할 데이터인 할 일 목록 건수를 전달한다.
    globalDispatch(addTodoList((todoList.length + 1).toString()));
  };

  return (
    <div>
      할 일 이름 :
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={onTodoChange}
      />
      <br></br>
      처리 우선 순위:
      <input
        type="text"
        name="order"
        value={todo.order}
        onChange={onTodoChange}
      />
      <button onClick={onAddTodo}>추가하기</button>
      <hr></hr>
      {todoList.map((item, index) => (
        <li key={index}>
          {item.title} --- {item.order}
        </li>
      ))}
    </div>
  );
};

export default Todos;
