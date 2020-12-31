const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET tags_details listing.
router.get('/', async function (req, res, next) {
  try {
    const tags_details = await model.tags_detail.findAll({});
    if (tags_details.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': tags_details
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
    const tags_detailsId = req.params.id;
    const tags_details = await model.tags_detail.findAll({
      where: {
        id: tags_detailsId
      }
    });
    if (tags_details.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': tags_details
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

// POST tags_details
router.post('/', async function (req, res, next) {
  try {
    const {
      id_tags,
      id_content,
      createdBy
    } = req.body;
    const tags_details = await model.tags_detail.create({
        id_tags,
        id_content,
        createdBy
    });
  if (tags_details) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'tags_detail berhasil ditambahkan',
      'data': tags_details,
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

// UPDATE tags_details
router.patch('/:id', async function (req, res, next) {
  try {
    const tags_detailsId = req.params.id;
    const {
        id_tags,
        id_content,
        createdBy
    } = req.body;
    const tags_details = await model.tags_detail.update({
        id_tags,
        id_content,
        createdBy
    }, {
      where: {
        id: tags_detailsId
      }
    });
    if (tags_details) {
      res.json({
        'status': 'OK',
        'messages': 'tags_detail berhasil diupdate',
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

// UPDATE tags_details
router.put('/', async function (req, res, next) {
  try {
    const {
        id_tags,
        id_content,
        createdBy
    } = req.body;
    const tags_details = await model.tags_detail.update({
        id_tags,
        id_content,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (tags_details) {
      res.json({
        'status': 'OK',
        'messages': 'tags_detail berhasil diupdate',
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

// DELETE tags_details
router.delete('/:id', async function (req, res, next) {
  try {
    const tags_detailsId = req.params.id;
    const tags_details = await model.tags_detail.destroy({ where: {
      id: tags_detailsId
    }})
    if (tags_details) {
      res.json({
        'status': 'OK',
        'messages': 'tags_detail berhasil dihapus',
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