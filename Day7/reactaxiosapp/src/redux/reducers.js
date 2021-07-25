//업무 별로 생성한 각 종 액션 파일을 하나의 액션 파일로 통합한다.
//import Article from "./article/reducers";

//각 종 리듀서 파일을 통합해주는 combineReducers함수를 참조한다.
import { combineReducers } from "redux";

import Login from "./login/reducers";

export default combineReducers({ Login });

//export default combineReducers({Login, Article}); 두 개 할 때는 이렇게
