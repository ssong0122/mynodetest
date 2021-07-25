//리덕스 패키지 내에서 제공하는 createStore, compose 객체 참조
import { createStore, compose } from "redux";

//Store에 저장한 리액트 App내 모든 리듀서 파일 참조

import reducers from "./reducers";

//스토어 생성 및 환경 구성하기
export function configureStore(intialState) {
  //스토어에 관련 정보를 전달해 생성한다.

  //createStore 생성 기본 방식1
  //const store = createStore(reducers, intialState);

  //REDUX CHROME DEVTOOLS와 연동되는 추가 설정하는 방식2
  const store = createStore(
    reducers,
    intialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  //생성된 스토어 객체 반환한다.
  return store;
}
