import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ArticleModify = () => {
  const [article, setArticle] = useState({ title: "", contents: "" });
  const [articleIdx, setArticleIdx] = useState(0);

  //파라메터로 전달되는 와일드 카드 변수명으로 전달되는 값을 받아온다.
  const { idx } = useParams();

  const titleRef = useRef();
  const contentsRef = useRef();

  const history = useHistory();
  //최초 컴포넌트 로딩 시에만 해당 단일 게시글 정보를 조회하여 바인딩 처리한다.
  useEffect(() => {
    setArticleIdx(idx);
    console.log("ArticleModify에서 수신한 게시글 고유 번호는 : ", idx);

    axios
      .get(`http://localhost:3005/api/articles/${idx}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setArticle(res.data.data);
        } else {
          alert("백엔드 에러");
        }
      })
      .catch((err) => {
        alert("백엔드 호출 에러");
      });
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
      .put("http://localhost:3005/api/articles", article)
      .then((res) => {
        console.log("데이터 처리 결과 : ", res.data);
        alert("수정완료");
        history.push("/article/list");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //게시글 삭제 처리 이벤트
  const onDeleteArticle = () => {
    axios
      .delete(`http://localhost:3005/api/articles/${article.id}`)
      .then((res) => {
        console.log("데이터 처리 결과 : ", res.data);
        alert("삭제완료");
        history.push("/article/list");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>수정 페이지</h1>
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
      <button onClick={onSaveArticle}>수정하기</button>
      <button onClick={onDeleteArticle}>삭제하기</button>
    </div>
  );
};

export default ArticleModify;
