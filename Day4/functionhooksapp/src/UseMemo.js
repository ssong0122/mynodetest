import React, { useMemo, useState } from "react";

//UseMemo는 주로 랜더링 발생 시마다 실행되는 함수가 아닌, 특정 데이터가 변경되었을 때만 실행되는 함수를 정의하고 사용할 때 이용한다.
//랜더링 시마다 정의된 함수의 호출 및 실행이 되면 리액트앱의 성능을 저하시키는 원인이 된다.
//따라서 재사용이 가능한 함수 기능의 호출을 특정 데이터가 변경되었을 때만 호출하고자 할 때 사용
//실제 호출 함수를 UI에서 호출하는 경우에 주로 사용

//익명함수 + 화살표 함수를 이용해 평균값 구하기
const getAverage = (numbers) => {
  console.log("평균값 계산하는 중.....");
  if (numbers.length === 0) return 0;

  //배열의 reduce메소드는 배열 안의 값을 모두 합친 총합계를 반환한다.
  const sum = numbers.reduce((a, b) => a + b);

  //배열의 건수로 총합을 나누어 평균값을 반환한다.
  return sum / numbers.length;
};

function getAverage2(numbers) {
  console.log("평균값 계산을 진행합니다.");
  if (numbers.length === 0) return 0;

  //배열의 reduce메소드는 배열 안의 값을 모두 합친 총합계를 반환한다.
  const sum = numbers.reduce((a, b) => a + b);

  //배열의 건수로 총합을 나누어 평균값을 반환한다.
  return sum / numbers.length;
}

const UseMemo = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  //특정 함수를 호출하는 데 지정된 스테이트 값이 변경되었을 때만 특정 함수를 호출하고, 그 값을 반환받고자 할 때 useMemoHook을 이용한다.
  //useMemo를 이용해 재사용 가능한 함수를 UI에서 호출하면 리액트 성능을 개선할 수 있다.
  const avg = useMemo(() => getAverage2(list), [list]);

  const onChangeData = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

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
        <b>평균값1 : {getAverage(list)}</b>
        <b>평균값2 : {avg}</b>
      </div>
    </div>
  );
};

export default UseMemo;
