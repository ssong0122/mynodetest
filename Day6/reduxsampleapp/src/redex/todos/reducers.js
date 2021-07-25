//STEP1)TODO_ADD 액션 타입 상수 참조
import {
  TODO_ADD,
  TODO_NEW_ITEM,
  TODO_LIST,
} from "../../constants/actionTypes";

//STEP2-1) 리듀서 함수에서 사용할 전역 데이터의 구조 정의 및 값 초기화
const INIT_STATE = {
  todoCount: 0,
  todoItem: {},
  todoList: [],
};

//STEP2-2)액션의 표준화된 기본 형식을 정의한다.
type TodoAction = { type: string, payload: {} | string };

//초기값 세팅 영역
//type State = { todoCount?: 0 | null }; //, todoList?: [] | null

//STEP3) 리듀서 함수 정의 및 기능 구현
//리듀서 함수명 = (state: 전역 데이터 구조 정의 및 초기값 세팅하기 = INIT_STATE, action: 리듀서에서 사용하는 액션함수) => {액션타입별 기능 정의};
//리듀서 함수에 전달되는 데이터는 정의할 객체 구조 및 초기화 세팅, 액션타입
//리듀서 함수 (state: 전역 데이터 구조 정의 및 초기화 객체, action:맵핑되는 액션 타입 )

//할 일 건수만 전역으로 관리하는 리듀서 함수
const ToDo = (state: INIT_STATE, action: TodoAction) => {
  switch (action.type) {
    case TODO_ADD:
      //todoCount를 관리하는 전역 state의 복사본을 만들고, 안에 todoCount속성값을 action에서 전달된 count값으로 업데이트 한다.
      return { ...state, todoCount: action.payload.todoCount };
    case TODO_NEW_ITEM:
      return { ...state, todoItem: action.payload.todoItem };
    case TODO_LIST:
      return { ...state, todoList: action.payload.todoList };
    default:
      return { ...state };
  }
};

//Todo리듀서 함수를 노출한다
export default ToDo;
