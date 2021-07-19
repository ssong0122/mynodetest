var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var multer = require('multer');
//업로드 기본경로 설정
//var upload = multer({dest:'public/upload/'});


//첨부한 파일명으로 업로드하기 
var storage  = multer.diskStorage({ 
    destination(req, file, cb) {
      cb(null, 'public/upload/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
  });
  
  var upload = multer({ storage: storage });


var db = require('../models/index');
var Member = db.Member;


//JWT토큰 발급 폼 페이지(MVC)
//localhost:3000/member/form
//JWT 토큰 발급 데이터 입력폼 
router.get('/form',async(req,res)=>{
    res.render("member/form");
});

//폼에서 전달된 토큰발급정보를 이용 JWT 토큰을 발급한다.
router.post('/form',async(req,res)=>{

    const productId = req.body.productId;
    const productName= req.body.productName;
    const price = req.body.price;
    const provider = req.body.provider;
    const stock = req.body.stock;

    const product ={
        productId:productId,
        productName:productName,
        price:price,
        provider:provider,
        stock:stock
    };

    //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
    const token = jwt.sign(product,process.env.JWT_SECRET,{
        expiresIn:'12h',// 60m,10s,24h 60분,10초,24시간
        issuer:'companyname'
    });

    //res.send()메소드는 모든 데이터 형식를 전달할수 있는 만능메소드
    //view,json,file,text 등 다양한 포맷의 결과물을 브라우저에 전달할수 있다.
    res.send(token);

});


//로그인 OPEN API 
//사용자 아이디/암호를 전달받아 사용자 인증 후 
//사용자 정보를 기반으로 JWT 토큰을 발급한다.
router.post('/login',async(req,res)=>{

    //사용자 아이디/암호를 호출한곳에서 받아온다.
    const userId = req.body.userId;
    const userPwd = req.body.userPwd;

    //메일주소장와 동일한 사용자 정보조회
    const member  = await Member.findOne({where:{email:userId}});

    //사용자 암호를 해시암호로 변경
    //bool result = bcrypt.compare('프론트에서 입력한 암호 텍스트',db에저장된해시암호);
    const result = await bcrypt.compare(userPwd,member.userpwd);

    if(result == true){
        console.log("암호가 일치합니다.")
    }else{
        console.log("암호가 일치하지 않습니다.")
    }
    
    //DB에 저된 해시암호와 사용자가 로그인한 해시암호가 동일하면
    if(result){

        var userInfo = {
            userId: member.email,
            userName:member.username,
            email:member.email,
            telephone:member.telehpone
        };

        //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
        const token = jwt.sign(userInfo,process.env.JWT_SECRET,{
            expiresIn:'24h',// 60m,10s,24h 60분,10초,24시간
            issuer:'msoftware'
        });

        return res.json({code:"200",data:token,msg:"인증토큰이 발급되었습니다."});
    }else{
        return res.json({code:"400",data:{},msg:"로그인에 실패하였습니다. 아이디암호를 정확히 입력해주세요."});
    }
});

//JWT토큰 유효성 검사 API 
//JWT토큰이 전달되면 해당 토큰에서 JSON 데이터를 추출하자
//localhost:3000/token/verify?token=토큰값
//localhost:3000/token/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0SWQiOiIzMzMzMyIsInByb2R1Y3ROYW1lIjoi7JeY7KeA64W47Yq467aBIiwicHJpY2UiOiIzMzMzMzMiLCJwcm92aWRlciI6IkxH7KCE7J6QIiwic3RvY2siOiIxMDAiLCJpYXQiOjE2MjQ2MDYxNDAsImV4cCI6MTYyNDY0OTM0MCwiaXNzIjoiY29tcGFueW5hbWUifQ.nu4SseHZTPnSqe2Y3ePlGutRabv6eeSl_Ucx-G9f89Y
router.get('/token/verify',async(req,res)=>{

    const token = req.query.token;

    //토큰에서 JSON 데이터를 추출하자
    //jwt.verify(JWT토큰값,토큰생성시 사용한 인증키값=비밀번호)
    var tokenData = jwt.verify(token,process.env.JWT_SECRET);

    console.log("토큰내 JSON데이터 값: ",tokenData);

    //데이터를 json으로 전달
    res.json(tokenData);
});



//회원목록 조회 화면
//localhost:3000/member/list
router.get('/list',async(req,res)=>{
    const memberList = await Member.findAll();
    res.render("member/list", {data:memberList});
});

//회원가입 페이지 뷰
//localhost:3000/member/regist
router.get('/regist',async(req,res)=>{
    res.render("member/regist");
});

//회원가입 정보등록처리 라우팅 메소드
//localhost:3000/member/regist
router.post('/regist',upload.single('photo'),async(req,res)=>{
    
    var uploadedFile = req.file;
    console.log("업로드된 파일정보:",uploadedFile);

    //DB에저장할 파일경로명(경로+파일명)
    let uploadFilePath= "/upload/"+ uploadedFile.filename;

    //일반 텍스트 암호를 해시암호화 알고리즘을 이용
    //난독화 및 복호화 불가한 해시코드로 생성하여 DB에 저장한다.
    const hashPwd = await bcrypt.hash(req.body.userpwd,12);

    console.log("해시암호====================>:",hashPwd);

    var member = {
        email:req.body.email,
        userpwd:hashPwd,
        entrytype:req.body.entrytype,
        nickname:req.body.nickname,
        username:req.body.username,
        telephone:req.body.telephone,
        photo:uploadFilePath,
        lastip:req.ip,
        usertype:req.body.usertype,
        userstate:req.body.userstate
    };

    console.log("등록데이터:",member);

    var savedMember = await Member.create(member);
    res.redirect("/member/list");
});


//회원수정 페이지 뷰
//localhost:3000/member/modify/1
router.get('/modify/:id',async(req,res)=>{
    var memberId = req.params.id;

    //전달된 사용자 아이디로 사용자 정보조회 뷰에 전달
    const member = await Member.findOne({where:{ id:memberId,entrytype:"0"}});

    res.render("member/modify",{member:member});
});

//회원정보 수정처리 라우팅 메소드
//localhost:3000/member/regist
router.post('/modify',upload.single('photo'),async(req,res)=>{

    var uploadedFile = req.file;
    console.log("업로드된 파일정보:",uploadedFile);

    //DB에저장할 파일경로명(경로+파일명)
    let uploadFilePath= "/upload/"+ uploadedFile.filename;

    const memberId = req.body.memberId;

    if(req.body.userpwd == null){
        const updated = await Member.update({ 
            email:req.body.email,
            entrytype:req.body.entrytype,
            nickname:req.body.nickname,
            username:req.body.username,
            photo:uploadFilePath,
        },{ where:{id:memberId}});
    }else{

        const hashPwd = await bcrypt.hash(req.body.userpwd,12);
        const updated = await Member.update({ 
            email:req.body.email,
            entrytype:req.body.entrytype,
            userpwd:hashPwd,
            nickname:req.body.nickname,
            username:req.body.username,
            photo:uploadFilePath,
        },{ where:{id:memberId}});
    }

    res.redirect("/member/list");
});

//회원정보 삭제처리 후 목록 페이지 이동
//localhost:3000/member/delete/1
router.get('/delete/:id',async(req,res)=>{

    console.log("전달 파라메터===============>",req.params.id);

    const memberId = req.params.id;
    const deletedCnt = await Member.destroy({where :{id:memberId}});

    res.redirect("/member/list");
});



module.exports = router;