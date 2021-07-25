import React, { useState, useEffect } from "react";

import axios from "axios";
//import ArticleModify from "./pages/articles/ArticleModify";
import { useHistory, Link } from "react-router-dom";

const ArticleList = () => {
  //STEP1)화면에 표현할 데이터 구조 정의 및 데이터 초기값 세팅

  //백엔드에서 가져올 게시글 목록 데이터 구조 정의
  const [articleList, setArticleList] = useState([]);
  const history = useHistory();

  //{match} const {articleidx} = match.params;

  //게시글 목록 컴포넌트가 최초 1번 랜더링이 완료되면 백엔드에서 게시글 목록 조회
  useEffect(() => {
    axios
      .get("api/articles") //http://localhost:3005/api/articles 에서 바꿈
      .then((res) => {
        console.log("백엔드에서 제공된 전체 데이터 구조 파악 : ", res);
        if (res.data.code == "200") {
          setArticleList(res.data.data);
        } else {
          //게시글 목록 세터 함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          alert("백엔드 호출 에러 발생");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //게시글 등록화면으로 이동시키기
  const onMoveRegist = () => {
    //히스토리 훅을 이용해 게시글 등록 페이지로 화면 전환
    history.push("/article/regist");
  };

  return (
    <div>
      <h1>게시글 목록 페이지</h1>
      <button onClick={onMoveRegist}>게시글 작성</button>
      <table>
        <thead>
          <tr>
            <td>글순번</td>
            <td>글제목</td>
            <td>뷰카운트</td>
            <td>ip주소</td>
            <td>게시여부</td>
          </tr>
        </thead>
        <tbody>
          {articleList.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={{ pathname: "/article/modify/" + item.id }}>
                  {item.id}
                </Link>
              </td>
              {/* 내가 만든 코드 
              <td
                onClick={() => {
                  history.push({
                    pathname: "/article/modify/",
                    state: { paramidx: item.id },
                  });
                }}
              >
                {item.title}
                {/* <Link to="/article/modify:">{item.title}</Link>//링크로 하려고 했는데, 링크 사용하라는 말 없어서 td에 onClick함수 사용ㅠㅠ
              </td>
               */}
              <td>
                <Link to={`/article/modify/${item.id}`}>{item.title}</Link>
              </td>
              <td>
                <Link
                  to={{
                    pathname: "/article/modify",
                    search: "?id=" + item.id,
                  }}
                >
                  {item.viewcount}
                </Link>
              </td>
              <td>{item.ipaddress}</td>
              <td>{item.displayyn == "1" ? "true" : "false"}</td>
              {/* 게시여부가 게시 : 1 | 게시 안함 : 0 으로 넘어와서 삼항연산자 사용 {item.displayyn == "1" ? "true" : "false"}    {item.displayyn === true ? "true" : "false"}*/}
            </tr>
          ))}
          {/* 
          내가 만든 등록 버튼 (나는 테이블 밑에 했는데...8ㅅ8)
          <tr>
            <td colSpan="2" align="center">
              <button
                onClick={() => {
                  history.push("/article/regist");
                }}
              >
                등록
              </button>
            </td>
          </tr> 
          */}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
