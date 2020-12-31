var express = require('express');
var router = express.Router();
const model = require('../../models/index');
const { Op } = require("sequelize");
var url = require('url');
var moment = require('moment');

const paginate = require('express-paginate');

router.use(paginate.middleware(10, 50));

/* GET home page. */
router.get('/', function (req, res, next) {

  model.content.findAndCountAll({
    include:['user']
  })
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.render('./frontend/archive', {
        moment: moment,
        data: results.rows,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
    })

});

/* GET Search. */
router.get('/search', function (req, res, next) {
var q = url.parse(req.url, true);
const key = q.query.keyword;
model.content.findAll({
    where: {
      title: {
        [Op.like]: '%'+key+'%'
      }
    }, 
    include:['user']
  })
  .then(result => {
    res.render('./frontend/archive', {
      data: result, moment: moment
    });
  });

});

module.exports = router;