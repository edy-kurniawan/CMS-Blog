var express = require('express');
var router = express.Router();
const model = require('../../models/index');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const category = await model.category.findAll({});
    if (category) {
      res.render('./backoffice/add_konten',{ data:false, category:category , name: req.session.username, role: req.session.role });
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});

//GET by ID
router.get('/:id', async function (req, res, next) {
  try {
    const contentsId = req.params.id;
    const contents = await model.content.findOne({
      where: {
        id: contentsId
      }
    });
    const category = await model.category.findAll({});
    if (contents) {
      res.render('./backoffice/add_konten',{ data:contents, category :category, name: req.session.username, role: req.session.role });
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
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
