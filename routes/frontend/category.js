var express = require('express');
var router = express.Router();
const model = require('../../models/index');
const paginate = require('express-paginate');

router.use(paginate.middleware(10, 50));

/* GET home page. */
router.get('/:category', function(req, res, next) {
  const category = req.params.category;
  model.category.findOne({ where :{ category:category}})
    .then(result => {
      const get_id = result.id;

  model.content.findAndCountAll({ where :{ id_category: get_id}})
  .then(results => {
    const itemCount = results.count;
    const pageCount = Math.ceil(results.count / req.query.limit);
    res.render('./frontend/category', {
      data: results.rows,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
      title:req.params.category
    });
  }).catch(err => next(err))
  })
  
});

module.exports = router;
