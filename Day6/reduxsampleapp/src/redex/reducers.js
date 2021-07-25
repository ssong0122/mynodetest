//업무 별로 생성한 각 종 액션 파일을 하나의 액션 파일로 통합한다.

//각 종 리듀서 파일을 통합해주는 combineReducers함수를 참조한다.
import { combineReducers } from "redux";

//todos/reducer.js파일에서 노출한 ToDo 리듀서 함수를 참조한다.
import ToDo from "./todos/reducers";

//import Login from "./login/reducers";

export default combineReducers({ ToDo });

//export default combineReducers({ ToDo ,Login});
