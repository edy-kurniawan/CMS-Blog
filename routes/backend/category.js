const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET categorys listing.
router.get('/', async function (req, res, next) {
  try {
    const categorys = await model.category.findAll({});
    if (categorys.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': categorys
      })
    } else {
      res.json({
        'status': 'OK',
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
    const categorysId = req.params.id;
    const categorys = await model.category.findOne({
      where: {
        id: categorysId
      }
    });
    if (categorys.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': categorys
      })
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

// POST categorys
router.post('/', async function (req, res, next) {
  try {
    const {
      category,
      desc
    } = req.body;
    var user = req.session.code
    const categorys = await model.category.create({
        category,
        desc,
        createdBy : user.toString()
    });
  if (categorys) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'category berhasil ditambahkan',
      'data': categorys,
    })
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message,
     'data': {},
   })
 }
});

// UPDATE categorys
router.patch('/:id', async function (req, res, next) {
  try {
    const categorysId = req.params.id;
    const {
        category,
        desc,
        createdBy
    } = req.body;
    const categorys = await model.category.update({
        category,
        desc,
        createdBy
    }, {
      where: {
        id: categorysId
      }
    });
    if (categorys) {
      res.json({
        'status': 'OK',
        'messages': 'category berhasil diupdate',
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

// UPDATE categorys
router.put('/', async function (req, res, next) {
  try {
    const {
        category,
        desc,
        createdBy
    } = req.body;
    const categorys = await model.category.update({
        category,
        desc,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (categorys) {
      res.json({
        'status': 'OK',
        'messages': 'category berhasil diupdate',
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

// DELETE categorys
router.delete('/:id', async function (req, res, next) {
  try {
    const categorysId = req.params.id;
    const categorys = await model.category.destroy({ where: {
      id: categorysId
    }})
    if (categorys) {
      res.json({
        'status': 'OK',
        'messages': 'category berhasil dihapus',
      })
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