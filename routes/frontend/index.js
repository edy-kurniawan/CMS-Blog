var express = require('express');
var router = express.Router();
const model = require('../../models/index');
const paginate = require('express-paginate');

router.use(paginate.middleware(10, 50));
/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
      const data = await model.content.findAndCountAll({order: [
        ['createdAt', 'DESC'],
        ],include:['user'],
        limit: req.query.limit, 
        offset: req.skip
    });

      const itemCount = data.count;
      const pageCount = Math.ceil(data.count / req.query.limit);
      
      const category = await model.category.findAll({});
      const populer = await model.content.findAll({
        order: [
          ['view', 'DESC']
        ]
      });

        if (data) {
          res.render('./frontend/index',{ message: false, 
            data: data.rows,
            category:category, 
            populer:populer, 
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
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
});

module.exports = router;
