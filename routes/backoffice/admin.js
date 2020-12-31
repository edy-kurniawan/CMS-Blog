var express = require('express');
var router = express.Router();

const model = require('../../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.session.admin) {
    res.redirect('/auth');
  }else {
    try {
      const users = await model.user.findAll({});
      if (users.length !== 0) {
        res.render('backoffice/admin',{
          data: users, name: req.session.username, role: req.session.role
        });
      } else {
        
      }
    } catch (err) {
      res.json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  } 
});


module.exports = router;
