const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET likes listing.
router.get('/', async function (req, res, next) {
  try {
    const likes = await model.like.findAll({});
    if (likes.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': likes
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
    const likesId = req.params.id;
    const likes = await model.like.findAll({
      where: {
        id: likesId
      }
    });
    if (likes.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': likes
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

// POST likes
router.post('/', async function (req, res, next) {
  try {
    const {
      id_comment,
      createdBy
    } = req.body;
    const likes = await model.like.create({
        id_comment,
        createdBy
    });
  if (likes) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'like berhasil ditambahkan',
      'data': likes,
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

// UPDATE likes
router.patch('/:id', async function (req, res, next) {
  try {
    const likesId = req.params.id;
    const {
        id_comment,
        createdBy
    } = req.body;
    const likes = await model.like.update({
        id_comment,
        createdBy
    }, {
      where: {
        id: likesId
      }
    });
    if (likes) {
      res.json({
        'status': 'OK',
        'messages': 'like berhasil diupdate',
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

// UPDATE likes
router.put('/', async function (req, res, next) {
  try {
    const {
        id_comment,
        createdBy
    } = req.body;
    const likes = await model.like.update({
        id_comment,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (likes) {
      res.json({
        'status': 'OK',
        'messages': 'like berhasil diupdate',
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

// DELETE likes
router.delete('/:id', async function (req, res, next) {
  try {
    const likesId = req.params.id;
    const likes = await model.like.destroy({ where: {
      id: likesId
    }})
    if (likes) {
      res.json({
        'status': 'OK',
        'messages': 'like berhasil dihapus',
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