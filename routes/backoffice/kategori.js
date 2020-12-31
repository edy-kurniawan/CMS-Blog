var express = require('express');
var router = express.Router();
const model = require('../../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.session.admin) {
    res.redirect('/auth');
  } else {
    const categorys = await model.category.findAll({});
    res.render('./backoffice/kategori',{ data: categorys, name: req.session.username, role: req.session.role });
  }
});

module.exports = router;
