var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
var Member = db.Member;

//전체 회원목록 데이터 조회 OPEN API
//localhost:3000/api/member
router.get("/", async (req, res) => {
  const memberList = await Member.findAll({
    attributes: [
      "id",
      "email",
      "nickname",
      "username",
      "telephone",
      "createdAt",
    ],
    where: { userstate: "1" },
  });
  return res.json({
    code: "200",
    data: memberList,
    msg: "Ok",
  });
});

//회원 로그인 및 JWT인증 토큰 발급 OPEN API
//localhost:3000/api/member/login
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const userpwd = req.body.userpwd;

  const loginUser = await Member.findOne({ where: { email: email } });

  if (loginUser) {
    // 화면에서 전달된 사용자 암호와 DB에 저장된 암호
    const result = await bcrypt.compare(userpwd, loginUser.userpwd);

    if (result) {
      //JWT 토큰에 담을 데이터
      var memberData = {
        email: loginUser.email,
        username: loginUser.username,
        telephone: loginUser.telehpone,
        photo: loginUser.photo,
      };

      //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
      const token = jwt.sign(memberData, process.env.JWT_SECRET, {
        expiresIn: "24h", // 60m,10s,24h 60분,10초,24시간
        issuer: "msoftware",
      });

      return res.json({
        code: "200",
        data: { token: token, member: memberData },
        msg: "Ok",
      });
    } else {
      return res.json({
        code: "400",
        data: {},
        msg: "비밀번호가 일치하지 않습니다.",
      });
    }
  } else {
    return res.json({
      code: "400",
      data: {},
      msg: "아이디가 존재하지 않습니다.",
    });
  }
});
//신규회원정보 등록  OPAN API
//localhost:3000/api/member
router.post("/", async (req, res) => {
  const hashPwd = await bcrypt.hash(req.body.userpwd, 12);

  var member = {
    email: req.body.email,
    userpwd: hashPwd,
    entrytype: req.body.entrytype,
    nickname: req.body.nickname,
    username: req.body.username,
    telephone: req.body.telephone, // 지금 설정은 리엑트 기준, 백엔드 에러 나면 이걸로 바꿔보기 telephone:""
    photo: req.body.photo,
    lastip: req.ip,
    usertype: "1",
    userstate: "1",
  };

  const savedMemer = await Member.create(member);

  return res.json({
    code: "200",
    data: savedMemer,
    msg: "Ok",
  });
});

//기존회원 정보 수정 OPEN API
//localhost:3000/api/member
router.put("/", async (req, res) => {
  if (req.body.userpwd != null) {
    const hashPwd = await bcrypt.hash(req.body.userpwd, 12);

    const updated = await Member.update(
      {
        email: req.body.email,
        userpwd: hashPwd,
        nickname: req.body.nickname,
        username: req.body.username,
      },
      { where: { id: req.body.memberId } }
    );

    return res.json({
      code: "200",
      data: {},
      msg: "Ok",
    });
  } else {
    const updated = await Member.update(
      {
        email: req.body.email,
        nickname: req.body.nickname,
        username: req.body.username,
      },
      { where: { id: req.body.memberId } }
    );

    return res.json({
      code: "200",
      data: {},
      msg: "Ok",
    });
  }
});

//파일 업로드 처리 OPEN API 서비스
//localhsot:3000/api/member/upload
router.post("/upload", upload.single("photo"), async (req, res) => {
  console.log("서버 파일 업로드 호출됨=================>");

  const uploadFile = req.file;

  let filePath = "/upload/" + uploadFile.filename;
  return res.json(filePath);

  //return res.json(uploadFile);
});

//단일 회원정보 조회 OPEN API
//localhost:3000/api/member/1
router.get("/:id", async (req, res) => {
  var member = await Member.findOne({ where: { id: req.params.id } });

  return res.json({
    code: "200",
    data: member,
    msg: "Ok",
  });
});

//단일 회원정보 삭제 OPEN API
//localhost:3000/api/member/1
router.delete("/:id", async (req, res) => {
  const deletedCnt = await Member.destroy({ where: { id: req.params.id } });

  return res.json({
    code: "200",
    data: deletedCnt,
    msg: "Ok",
  });
});

module.exports = router;
