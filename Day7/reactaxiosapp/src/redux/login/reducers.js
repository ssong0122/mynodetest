//STEP1)MEMBER_LOGIN 액션 타입 상수 참조
import { MEMBER_LOGIN, MEMBER_LOGIN_UPDATE } from "../../constants/actionTypes";

//STEP2) 리듀서 함수에서 사용할 전역 데이터의 구조 정의 및 값 초기화
const INIT_STATE = {
  token: "",
  loginUser: {},
};

//STEP3)해당 리듀서 함수에서 사용할 액션 타입 정의
type LoginAction = { type: string, payload: {} | string };

//STEP4)리듀서 함수 기능 정의
//리듀서 함수명 = (state : 리듀서 함수에서 관리하는 전역 데이터 정의 및 초기화, action :  관련 액션 객체)=>{액션 이름 별 전역 데이터}
const Login = (state: INIT_STATE, action: LoginAction) => {
  switch (action.type) {
    case MEMBER_LOGIN:
      return { ...state, token: action.payload.token };
    case MEMBER_LOGIN_UPDATE:
      return { ...state, loginUser: action.payload.member }; //actions.js 에 member로 넘겨주니까
    default:
      return { ...state };
  }
};

//STEP5)리듀서 함수를 노출한다
export default Login;
