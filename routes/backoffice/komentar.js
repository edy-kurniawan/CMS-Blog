var express = require('express');
var router = express.Router();
const model = require('../../models/index');
var moment = require('moment');

/* GET home page. */
router.get('/',async function(req, res, next) {
  if(!req.session.admin) {
    res.redirect('/auth');
  } else {
    const comment = await model.comment.findAll({
      include:['content','user','like']
    });
    res.render('./backoffice/komentar',{ data: comment, moment:moment, name: req.session.username, role: req.session.role });
    
  }
});

// POST comments
router.post('/', async function (req, res, next) {
  try {
    const comments = await model.comment.create({
        id_content : req.body.konten,
        comment : req.body.komentar,
        createdBy : req.session.memberid
    });
  if (comments) {
    res.redirect('/blog/'+req.body.slug)
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message,
     'data': {},
   })
 }
});

module.exports = router;
