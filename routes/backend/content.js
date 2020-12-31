const express = require('express');
const router = express.Router();
const model = require('../../models/index');
var save = require('summernote-nodejs');

// GET contents listing.
router.get('/', async function (req, res, next) {
  try {
    const contents = await model.content.findAll({include: ['category','user']});
    if (contents.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': contents
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
    const contentsId = req.params.id;
    const contents = await model.content.findOne({
      where: {
        id: contentsId
      },
      include: 'category'
    });
    if (contents.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': contents
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

// POST contents
router.post('/', async function (req, res, next) {
  try {
    const {
      id_category,
      title,
      desc,
      slug,
      view,
      last_view,
      share,
      createdBy
    } = req.body;
    const contents = await model.content.create({
        id_category,
        title,
        desc : save(desc,"images"),
        slug,
        view,
        last_view,
        share,
        createdBy
    });
  if (contents) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'content berhasil ditambahkan',
      'data': contents,
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

// UPDATE contents
router.patch('/:id', async function (req, res, next) {
  try {
    const contentsId = req.params.id;
    const {
        id_category,
        title,
        desc,
        slug,
        view,
        last_view,
        share,
        createdBy
    } = req.body;
    const contents = await model.content.update({
        id_category,
        title,
        desc,
        slug,
        view,
        last_view,
        share,
        createdBy
    }, {
      where: {
        id: contentsId
      }
    });
    if (contents) {
      res.json({
        'status': 'OK',
        'messages': 'content berhasil diupdate',
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

// UPDATE contents
router.put('/', async function (req, res, next) {
  try {
    const {
        id_category,
        title,
        desc,
        slug,
        view,
        last_view,
        share,
        createdBy
    } = req.body;
    const contents = await model.content.update({
        id_category,
        title,
        desc,
        slug,
        view,
        last_view,
        share,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (contents) {
      res.json({
        'status': 'OK',
        'messages': 'content berhasil diupdate',
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

// DELETE contents
router.delete('/:id', async function (req, res, next) {
  try {
    const contentsId = req.params.id;
    const contents = await model.content.destroy({ where: {
      id: contentsId
    }})
    if (contents) {
      res.json({
        'status': 'OK',
        'messages': 'content berhasil dihapus',
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