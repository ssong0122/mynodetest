import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ArticleRegist = () => {
  //초기 등록 화면이니까 빈 게시글 객체 구조를 만들어주고 초기값을 세팅해줍니다.
  const [article, setArticle] = useState({
    title: "",
    boardid: 1,
    contents: "",
    viewcount: 0,
    displayyn: true,
    ipaddress: "",
    createduid: 1,
    updateduid: 1,
  });

  //제목,내용 입력 요소 값 제어용 useRef 생성
  const titleRef = useRef();
  const contentsRef = useRef();

  const history = useHistory();

  //최초 컴포넌트 로딩 시에만 제목 입력박스에 마우스 포커스 맞추기
  useEffect(() => {
    console.log("해당 컴포넌트가 최초 호출될 때 1회만 실행.");
    titleRef.current.focus();
    contentsRef.current.focus();
  }, []);

  //입력요소와 useSate간 데이터 바인딩 적용
  const onArticleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  //게시글 저장 이벤트 처리기 함수
  const onSaveArticle = () => {
    if (article.title === "") {
      alert("제목을 입력해주세요.");
      //useRef로 포커싱 처리하기
      titleRef.current.focus();

      return false;
    }
    if (article.contents === "") {
      alert("내용을 입력해주세요.");
      //useRef로 포커싱 처리하기
      contentsRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:3005/api/articles", article)
      .then((res) => {
        console.log("데이터 처리 결과 : ", res.data);
        alert("등록완료");
        history.push("/article/list");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <h1>등록 페이지</h1>
      제목 :
      <input
        type="text"
        name="title"
        value={article.title}
        ref={titleRef}
        onChange={onArticleChange}
      ></input>
      <hr></hr>
      내용 :
      <textarea
        name="contents"
        value={article.contents}
        ref={contentsRef}
        rows="10"
        cols="50"
        onChange={onArticleChange}
      />
      <hr></hr>
      게시여부 :
      <select
        name="displayyn"
        value={article.displayyn}
        onChange={onArticleChange}
      >
        <option Value="1">게시</option>
        <option value="0">게시 안함</option>
      </select>
      <hr></hr>
      <button onClick={onSaveArticle}>저장하기</button>
      {/* 내가 한 코딩 (나는 테이블로 함)
      <table>
        <thead>
          <tr>
            <td>글제목</td>
            <td>
              <input type="text" name="title" value={article.title} ref={titleRef} onChange={onArticleChange}></input>
            </td>
          </tr>
          <tr>
            <td>글내용</td>
            <td>
              <textarea rows="3" cols="50" id="contents"></textarea>
            </td>
          </tr>

          <tr>
            <td>게시여부</td>
            <td>
              <select id="display">
                <option defaultValue="1">게시</option>
                <option value="0">게시 안함</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button>저장</button>
            </td>
          </tr>
        </thead>
      </table> 
      */}
    </div>
  );
};

export default ArticleRegist;
