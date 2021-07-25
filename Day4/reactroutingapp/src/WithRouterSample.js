import React from "react";

//history 기능 사용을 위한 withRouter 객체 참조
import { withRouter } from "react-router-dom";

//함수형 컴포넌트에서의 기본적인 history사용법(링크 컴포넌트/페이지 간 이동 )
const WithRouterSample = ({ location, match, history }) => {
  const onMoveToHome = () => {
    //history.push()메소드는 해당 경로가 없으면 이동 경로 내역 목록에 해당 링크 주소 추가
    //있으면 등록된 라우팅 주소 URL을 그냥 사용하여 해당 컴포넌트로 이동하게 함
    history.push("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        홈으로 이동
      </button>

      {/* withRouter객체를 이용해 history를 사용하는 경우는 반드시 export출력에서 withRouter객체로 컴포넌트를 감싸준다. */}
      <button onClick={onMoveToHome}>홈으로 이동</button>
    </div>
  );
};
//withRouter객체를 이용해 history를 사용하는 경우는 반드시 export출력에서 withRouter객체로 컴포넌트를 감싸준다. ↓여기 말하는 거
export default withRouter(WithRouterSample);
