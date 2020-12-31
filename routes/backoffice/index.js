var express = require('express');
var router = express.Router();
const model = require('../../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.session.admin) {
    res.redirect('/auth');
  } else {
    const admins = await model.user.findAndCountAll({where: {role: 'admin'}});
    const members = await model.user.findAndCountAll({where: {role: 'member'}});
    const categorys = await model.category.findAndCountAll({});
    const contents = await model.content.findAndCountAll({});
    const data = await model.category.findAll({});
    res.render('./backoffice/index',{ 
      data: data,
      admin: admins.count,
      member: members.count,
      category: categorys.count,
      content:contents.count,
      name: req.session.username, 
      role: req.session.role 
    });
  }
});

module.exports = router;
