//전역으로 정의한 액션 타입 정보를 참조한다.

//STEP1)TODO_ADD 액션 타입 상수 참조
import {
  TODO_ADD,
  TODO_NEW_ITEM,
  TODO_LIST,
} from "../../constants/actionTypes";

//STEP2)액션의 표준화된 기본 형식을 정의한다.
//Todo 전역 데이터 관리를 위한 Todo전용 액션타입을 정의해서 사용한다.
type TodoAction = { type: String, payload: {} | string }; //액션 타입 자체를 표준화시켜주는 코드임 (Todo에서 사용할 액션의 기본 틀 설정)

//STEP3)액션 생성 함수 정의
//액션 생성 함수는 UI 컴포넌트에서 참조해서 사용할 수 있는 액션 생성 함수이다.
//액션 생성 함수는 UI 컴포넌트에서 호출할 수 있어야 하기 때문에 export형식으로 모듈 밖으로 관련 기능을 노출시켜야 한다.

//액션 생성 함수명 = (UI 컴포넌트에서 전달된 data(json 객체로 받는 경우 문자열) ):TodoAction=>({액션 객체 세팅하기});
//액션 생성 함수는 액션 겍체만 만들어주면 된다.

//액션 함수에 전달 파라메터로 할 일 건수를 전달한다.
//할 일 건수는 리듀서 함수로 전달되어 전역 데이터 공간에 할 일 건수 정보만 관리한다.
export const addTodoList = (todoCount: string): TodoAction => ({
  //TodoAction=>({}) ==> TodoAction에 대한 값을 다시 세팅해주는 부분
  type: TODO_ADD,
  payload: { todoCount },
});

//최신 추가 할 일 아이템 변경 시 최신 아이템을 전역으로 저장한다.
export const addTodoItem = (todoItem: string): TodoAction => ({
  type: TODO_NEW_ITEM,
  payload: { todoItem },
});

//전체 {todoList:[]} ==>json은 문자열로 넘어오기 때문에 배열이여도 string으로 해도 됨
export const todoListAll = (todoList: string): TodoAction => ({
  type: TODO_LIST,
  payload: { todoList },
});
