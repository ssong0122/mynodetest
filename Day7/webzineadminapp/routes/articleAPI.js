var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
var multer = require("multer");

var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/upload/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

//ORM 참조하기
var db = require("../models/index");
var Article = db.Article;

//전체 게시글 목록 데이터 반환 라우팅 메소드
//라우팅주소:  localhost:3005/api/articles
//반환값: JSON 포맷 게시글 목록
//비동기 방식으로 라우팅메소드  함수 정의하기
router.get("/", async (req, res) => {
  //브라우저에서 AJAX 헤더에 포함되어 전달되는 JWT 토큰을 추출한다.
  const token = req.headers["x-access-token"];
  //const token = req.headers.authorization.split("Bearer ")[1];

  console.log("클라이언트 토큰 값 :", token);

  let result = { code: "", data: [], msg: "" };

  //발급된 토큰정보가 존재하지 않은경우
  if (token == undefined) {
    result.code = "404";
    result.data = [];
    result.msg = "인증되지 않은 사용자 입니다.(토큰없음)";

    return res.json(result);
  }

  //토큰에서 사용자정보 추출하여 클라이언트 사용자가 누구인지를 파악한다.
  try {
    var currentMember = jwt.verify(token, process.env.JWT_SECRET);
    console.log("API 호출 사용자정보:", currentMember);
  } catch (err) {
    result.code = "404";
    result.data = [];
    result.msg = "유효하지 않은 토큰입니다.";
    return res.json(result);
  }

  //예외처리하기
  try {
    const articleList = await Article.findAll();

    result.code = "200";
    result.data = articleList;
    result.msg = "Ok";

    return res.json(result);
  } catch (err) {
    //에러 무시하기
    console.log("서버에러 발생");
    //에러내용인 err을 DB/WAS서버내 FILE로 기록하거나/SMS/메일로 에러발생
    //사실을 알림(Notification) 처리해준다.

    result.code = "500";
    result.data = [];
    result.msg = "서버에러발생";

    return res.json(result);
  }
});

//단일 게시글 등록 API
//사용자 브라우저(AJAX)에서 단일 게시글 JSON데이터가 전달된다.
//라우팅 주소: localhost:3005/api/articles
//반환값 : 데이터 등록 처리 결과 값
router.post("/", async (req, res) => {
  let article = {
    title: req.body.title,
    boardid: 1,
    contents: req.body.contents,
    viewcount: 0,
    displayyn: req.body.displayyn,
    ipaddress: req.ip,
    createduid: 1,
    updateduid: 1,
  };

  console.log("등록코자하는데이터:", article);

  try {
    //DB에 해당 데이터를 저장하고 저장결과를 다시받아온다.
    const savedArticle = await Article.create(article);
    return res.json({ code: "200", data: savedArticle, msg: "Ok" });
  } catch (err) {
    console.log("서버에러내용:", err);
    return res.json({ code: "500", data: {}, msg: "서버에러발생" });
  }
});

//단일게시글 수정 API 라우팅 메소드
//사용자 브라우저에서 수정된 게시글 JSON데이터가 아래 주소로 전달된다.
//호출되는 라우팅 주소가 동일해도 라우팅메소드는 메소드유형(get,post,put,delete)이 다르면 주소를 동일하게 사용가능하다.
//라우팅주소 : localhost:3000/api/articles
router.put("/", async (req, res) => {
  try {
    //updatedId는 적용건수값을 받아온다.
    //적용된 pk(id)값이 아니네요..
    const updatedId = await Article.update(
      {
        title: req.body.title,
        contents: req.body.contents,
        displayyn: req.body.displayyn,
        ipaddress: req.ip,
        updateduid: 1,
      },
      { where: { boardid: 1, id: req.body.id } }
    );

    console.log("수정결과 반환값:", updatedId);

    console.log("진짜 데이터 수정완료");
    return res.json({
      code: "200",
      data: updatedId,
      msg: "정상적으로 수정완료되었습니다.",
    });
  } catch (err) {
    return res.json({ code: "500", data: 0, msg: "서버에러발생" });
  }
});

//파일 업로드 처리 OPEN API 서비스
//localhsot:3000/api/article/upload
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("서버 파일 업로드 호출됨=================>");

  const uploadFile = req.file;

  let filePath = "/upload/" + uploadFile.filename;
  return res.json(filePath);

  //return res.json(uploadFile);
});

//단일 게시글정보 조회 API 라우팅메소드
//라우팅 주소: localhost:3000/api/articles/1000
//url 호출체계내에 데이터를 담아 전달하는 방식을 와일드카드 방식이라함.
//와일드 카드로 넘어온 데이터는 :변수명으로 정의해서 사용한다.
router.get("/:id", async (req, res) => {
  const articleIdx = req.params.id;
  try {
    const article = await Article.findOne({ where: { id: articleIdx } });
    return res.json({ code: 200, data: article, msg: "Ok" });
  } catch (error) {
    return res.json({
      code: 500,
      data: {},
      msg: "관리자에게 문의하세요. 010-2222-333",
    });
  }
});

//게시글 삭제 API 라이팅 메소드
//사용자 브라우저에서 URL 주소를 통해 삭제하는 게시글 번호를 전달해온다.
//라우팅주소: localhost:3000/api/articles/1
router.delete("/:id", async (req, res) => {
  const articleIdx = req.params.id;

  try {
    const affectedCnt = await Article.destroy({ where: { id: articleIdx } });

    if (affectedCnt == 1) {
      console.log("진짜로 데이터가 삭제됨");
      return res.json({ code: "200", data: affectedCnt, msg: "Ok" });
    } else {
      console.log("delete query가 실행되었지만 조건이 맞지않아 삭제는 안됨...");
      return res.json({ code: "500", data: affectedCnt, msg: "Delete Failed" });
    }
  } catch (err) {
    return res.json({ code: "500", data: 0, msg: "서버 DB처리 실행 에러" });
  }
});

module.exports = router;
