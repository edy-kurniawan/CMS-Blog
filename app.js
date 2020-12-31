var createError = require('http-errors');
var express = require('express');
const model = require('./models/index');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var sha1 = require('sha1');
var cors = require('cors');


//frontend
var indexRouter = require('./routes/frontend/index');
var singleRouter = require('./routes/frontend/single');
var errorRouter = require('./routes/frontend/error');
var archiveRouter = require('./routes/frontend/archive');
var categoryRouter = require('./routes/frontend/category');
var signinRouter = require('./routes/frontend/login');

//backoffice
var backindexRouter = require('./routes/backoffice/index');
var backadminRouter = require('./routes/backoffice/admin');
var backkategoriRouter = require('./routes/backoffice/kategori');
var backkomentarRouter = require('./routes/backoffice/komentar');
var backkontenRouter = require('./routes/backoffice/konten');
var backaddkontenRouter = require('./routes/backoffice/add_konten');
var backloginRouter = require('./routes/backoffice/login');

//backend
var apiusersRouter = require('./routes/backend/users');
var apicategoryRouter = require('./routes/backend/category');
var apisubscribeRouter = require('./routes/backend/subscribe');
var apilikeRouter = require('./routes/backend/like');
var apicommentRouter = require('./routes/backend/comment');
var apicontentRouter = require('./routes/backend/content');
var apireplyRouter = require('./routes/backend/reply');
var apitagsRouter = require('./routes/backend/tags');
var apidetailtagsRouter = require('./routes/backend/tags_detail');

var apiloginRouter = require('./routes/backend/login');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static( "public" ) );

app.use(session({
  secret : 'yourSecret',
  resave : false,
  saveUninitialized : false,
  }));

//frontend
app.use('/', indexRouter);
app.use('/blog', singleRouter);
app.use('/error', errorRouter);
app.use('/archive', archiveRouter);
app.use('/category', categoryRouter);
app.use('/signin', signinRouter);

//backoffice
app.use('/admin', backindexRouter);
app.use('/admin/admin', backadminRouter);
app.use('/admin/kategori', backkategoriRouter);
app.use('/admin/komentar', backkomentarRouter);
app.use('/admin/konten', backkontenRouter);
app.use('/admin/add-konten', backaddkontenRouter);
app.use('/auth', backloginRouter);

//backend
app.use('/api/users', apiusersRouter);
app.use('/api/category', apicategoryRouter);
app.use('/api/subscribe', apisubscribeRouter);
app.use('/api/like', apilikeRouter);
app.use('/api/comment', apicommentRouter);
app.use('/api/content', apicontentRouter);
app.use('/api/reply', apireplyRouter);
app.use('/api/tags', apitagsRouter);
app.use('/api/tags-detail', apidetailtagsRouter);

// valid login

//login
app.post('/login', async function (req, res, next) {
  try {
    const Username = req.body.username;
    const Password = req.body.password;
    const users = await model.user.findOne({
      where: {
        username : Username,
        password : sha1(Password),
        role : 'admin'
      }
    });

    if (users) {
      req.session.admin = true;
      req.session.code = users.id;
      req.session.role = users.role;
      req.session.username = users.username;

      res.redirect('/admin');
    } else {
      var message = '<div style="color : red;">Username dan password tidak Ditemukan</div>';
      res.render('./backoffice/login', { data : message});
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});


//logout
app.get('/logout', (req, res) => {
  if(req.session.admin) {
      delete req.session.admin;
      res.redirect('/auth');
  } else {
      res.redirect('/');
  }        
});

////login member
app.post('/signup', async function (req, res, next) {
  try {
    const Username = req.body.email;
    const Password = req.body.password;
    const member = await model.user.findOne({
      where: {
        email : Username,
        password : sha1(Password),
        role : 'member'
      }
    });

    if (member) {
      req.session.member = true;
      req.session.memberid = member.id,
      req.session.user = member.username;

      res.redirect('/');
    } else {
      var message = '<div style="color : red;">Username dan password tidak Ditemukan</div>';
      res.render('./frontend/login', { data : message});
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});


//logout member
app.get('/signout', (req, res) => {
  if(req.session.member) {
      delete req.session.member;
      res.redirect('/');
  } else {
      res.redirect('/');
  }        
});

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
  res.locals.user = req.session.users;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
