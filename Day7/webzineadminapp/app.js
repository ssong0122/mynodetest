var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//express-ejs-layouts 노드 팩키지를 참조한다.
var expressLayouts = require('express-ejs-layouts');

//cors 노드 팩키지를 참조한다.
const cors = require('cors');

//.env 설정기능 참조적용
require('dotenv').config();

//MVC(Model영역 모듈 참조) 시퀄라이즈 ORM 객체 참조하기 
var sequelize = require('./models/index.js').sequelize;


//라우팅 파일에 대한 참조
//MVC(Controller=Routes영역 모듈 참조 ) 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//사용자 정보 관리 라우팅 파일 참조(MVC,API)
var memberRouter = require('./routes/member');

//개발자 정의 게시글 라우팅 파일을 참조한다. 
var articleRouter = require('./routes/article.js');

//게시글정보 제공 API 라우터를 참조한다.
var articleAPIRouter = require('./routes/articleAPI');
var memberAPIRouter = require('./routes/memberAPI');

//Node Express 웹개발 프레임워크를 이용해 Node App객체를 생성한다.
//node app객체를 초기화한다.
var app = express();

//특정 도메인 주소만 CORS 허용하기
// const options ={
//   origin:'http://localhost:5000',
//   credentials:true,
//   optionsSuccessStatus:200
// };

// app.use(cors(options));

//노드 어플리케이션에 cors기능 적용
//모든 리소스 접근 CORS 허용하기
//CORS 기능을 node app에 추가한다.
app.use(cors());

//시퀄라이즈 ORM객체를 이용해 지정한 MySQL 연결 동기화하기 
sequelize.sync();

// view engine setup
//view폴더의 기본경로를 세팅한다. 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//노드 앱에서 사용할 layout 관련 설정을 추가한다.
//기본 레이아웃 페이지를 views폴더내 layout.ejs파일로 지정한다.
app.set('layout','layout');

//콘텐츠 페이지내 스크립트를 레이아웃페이지에서 사용할게하고 외부 스크립트 파일도 사용할수 있게 설정
app.set('layout extractScripts',true);

//노드앱에서 expressLayouts 사용하게 최종 설정
app.use(expressLayouts);


//morgan 디버깅/로깅을 위한 기능을 앱에 추가
app.use(logger('dev'));

//json 제공 기능 추가
app.use(express.json());

//url인코딩 기능추가 
app.use(express.urlencoded({ extended: false }));

//쿠키파서기능 추가 
app.use(cookieParser());

//정적 웹페이지들 저장 경로 설정
//정적 웹페이지들을 도메인 주소를 통해 접근가능하게 해줌.
app.use(express.static(path.join(__dirname, 'public')));


//라우팅 파일의 기본 호출주소 체계 정의 
app.use('/', indexRouter);
app.use('/users', usersRouter);

//member 라우터 파일 기본 URL주소 정의
app.use('/member', memberRouter);

//게시글 라우팅 파일의 기본주소를 article로 시작하게 설정
//http://localhost:3000/article/~~~~
app.use('/article', articleRouter);

//게시글 API 라우터 파일 기본주소 정의
//localhost:3000/api/articles
app.use('/api/articles', articleAPIRouter);

app.use('/api/member', memberAPIRouter);



//404에러(서버상에 존재하지 않은 리소스를 호출할떄 서버에서 제공하는 에러)
app.use(function(req, res, next) {
  //404에러만 별도 처리해주는 미들웨어
  next(createError(404));
});

//전역 노드 어플리케이션 예외 처리기 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//노드 앱을 모듈 결과물로 제공한다. 
module.exports = app;
