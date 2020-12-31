const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET comments listing.
router.get('/', async function (req, res, next) {
  try {
    const comments = await model.comment.findAll({});
    if (comments.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': comments
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
    const commentsId = req.params.id;
    const comments = await model.comment.findAll({
      where: {
        id: commentsId
      }
    });
    if (comments.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': comments
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

// POST comments
router.post('/', async function (req, res, next) {
  try {
    const {
      id_content,
      comment,
      createdBy
    } = req.body;
    const comments = await model.comment.create({
        id_content,
        comment,
        createdBy
    });
  if (comments) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'comment berhasil ditambahkan',
      'data': comments,
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

// UPDATE comments
router.patch('/:id', async function (req, res, next) {
  try {
    const commentsId = req.params.id;
    const {
        id_content,
        comment,
        createdBy
    } = req.body;
    const comments = await model.comment.update({
        id_content,
        comment,
        createdBy
    }, {
      where: {
        id: commentsId
      }
    });
    if (comments) {
      res.json({
        'status': 'OK',
        'messages': 'comment berhasil diupdate',
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

// UPDATE comments
router.put('/', async function (req, res, next) {
  try {
    const {
        id_content,
        comment,
        createdBy
    } = req.body;
    const comments = await model.comment.update({
        id_content,
        comment,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (comments) {
      res.json({
        'status': 'OK',
        'messages': 'comment berhasil diupdate',
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

// DELETE comments
router.delete('/:id', async function (req, res, next) {
  try {
    const commentsId = req.params.id;
    const comments = await model.comment.destroy({ where: {
      id: commentsId
    }})
    if (comments) {
      res.json({
        'status': 'OK',
        'messages': 'comment berhasil dihapus',
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