import React, { useState, useEffect, useRef } from "react";

//UseEffect Hook은 함수형 컴포넌트에서의 컴포넌트 생애주기 및 데이터 (state)변경 감지
//이벤트 기능을 제공합니다.
const UseEffectHook = () => {
  //state명과 세터 함수명은 달라도 됨
  //그렇지만 다리고 state가 많아지면 헷갈리겠지요?
  const [testString, setTest] = useState("테스트1");

  //dom을 참조할 상수를 선언한다.
  const testRef = useRef();

  const [testString1, setTest2] = useState("테스트2");

  const onTestChange = (e) => {
    //값을 변경 적용한다.
    setTest(e.target.value);
  };

  //컴포넌트의 상태가(state, layout,html) 변경될 때마다 호출됨
  useEffect(() => {
    console.log(
      "컴포넌트의 상태가(state, jsx, html) 변경될 때마다 호출됩니다. "
    );
  });
  //해당 컴포넌트가 최초 호출될 때 한 번만 실행
  //해당 컴포넌트가 최초 로드되면 이후 컴포넌트가 화면에서 사라질 때까지 실행되지 않음
  //화면 로드 완료 후 커서 포커싱이나 백엔드 데이터 조회 후 state값을 채워준다거나 하는 경우 주로 사용
  useEffect(() => {
    console.log("해당 컴포넌트가 최초 호출될 때 1회만 실행.");
    testRef.current.focus();
    testRef.current.style.background = "red";
  }, []);
  //지정된 state값이 변경될 때마다 실행된다.
  //ui요소와 바인딩된 특정 state값이 변경될 때 로직을 적용하거나 백엔드에서 데이터를 호출하거나 하는 경우 주로 사용

  useEffect(() => {
    console.log("지정된 state값이 변경될 때마다 실행된다.00000");
  }, [testString, testString1]);

  useEffect(() => {
    console.log("지정된 state값이 변경될 때마다 실행된다.111111");
  }, [testString1]);

  return (
    <div>
      <input
        type="text"
        ref={testRef}
        value={testString}
        onChange={onTestChange}
      />
    </div>
  );
};

export default UseEffectHook;
