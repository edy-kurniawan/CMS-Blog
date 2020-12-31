var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.users) {
    res.render('./backoffice/login', {data:false});
  } else {
    res.redirect('/admin');
  }
  
});

module.exports = router;
