import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";

//useCallback 훅은 이벤트 발생 시 호출하는 이벤트 처리 (핸들러) 함수의 생성을
//컴포넌트가 랜더링 될 때마다 해당 함수가 생성되는 것을 방지하여 리액트 성능을 개선시켜준다.

const getAverage = (numbers) => {
  console.log("평균값 계산하는 중.....");
  if (numbers.length === 0) return 0;

  //배열의 reduce메소드는 배열 안의 값을 모두 합친 총합계를 반환한다.
  const sum = numbers.reduce((a, b) => a + b);

  //배열의 건수로 총합을 나누어 평균값을 반환한다.
  return sum / numbers.length;
};

const UseCallbackHook = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const avg = useMemo(() => getAverage(list), [list]);

  console.log(
    "화면에 변경이 발생할 때마다 하기 onChangeData, onInsert 이벤트 처리기 함수를 생성합니다."
  );

  //해당 컴포넌트가 최초 첫번째로 랜더링 될 때만 해당 이벤트 함수를 추가해준다.
  //onChangeData 이벤트 처리함수를 해당 컴포넌트가 최초 생성될 때에만 함수를 생성한다.
  //최초 랜더링 이후 UI요소에 변경이 발생할 때마다 해당 이벤트 처리함수는 생성되지 않는다.
  const onChangeData = useCallback((e) => {
    setNumber(e.target.value);
  }, []); //[]:빈 배열 ==> 최초 실행 시 한 번

  //number,list useState의 값이 변경될 때마다 해당 이벤트 처리 함수가 생성된다.
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]);

  return (
    <div>
      <input type="text" value={number} onChange={onChangeData}></input>
      <button onClick={onInsert}>등록</button>
      <hr></hr>
      {list.map((value, index) => (
        <li key={index}>{value}</li>
      ))}
      <hr></hr>
      <div>
        <b>평균값 : {avg}</b>
      </div>
    </div>
  );
};

export default UseCallbackHook;
