//STEP1)MEMBER_LOGIN 액션 타입 상수 참조
//액션 이름 전역 상수들 참조한다.
import { MEMBER_LOGIN, MEMBER_LOGIN_UPDATE } from "../../constants/actionTypes";

///STEP2)로그인 액션 형식 정의 : 타입 스크립트 (리덕스 자체에서 타입 스트립트 문법 제공)
type LoginAction = { type: String, payload: {} | string };

///STEP3)액션 생성 함수 정의
//액션 생성 함수명 = (ui 컴포넌트에서 전달되는 JSON 객체) : 사용하는 액션 객체 =>{액션 객체 정보 세팅}
export const memberLogin = (token: string): LoginAction => ({
  type: MEMBER_LOGIN,
  payload: { token },
});

//사용자 정보를 전역으로 관리하는 액션 생성 함수 추가
export const memberLoginUpdate = (member: string): LoginAction => ({
  type: MEMBER_LOGIN_UPDATE,
  payload: { member },
});
