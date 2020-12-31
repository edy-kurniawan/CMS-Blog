const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET replys listing.
router.get('/', async function (req, res, next) {
  try {
    const replys = await model.reply.findAll({});
    if (replys.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': replys
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
    const replysId = req.params.id;
    const replys = await model.reply.findAll({
      where: {
        id: replysId
      }
    });
    if (replys.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': replys
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

// POST replys
router.post('/', async function (req, res, next) {
  try {
    const {
      id,
      reply
    } = req.body;
    const replys = await model.reply.create({
        id_comment : id,
        createdBy :  req.session.code,
        reply : reply
    });
  if (replys) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'reply berhasil ditambahkan',
      'data': replys,
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

// UPDATE replys
router.patch('/:id', async function (req, res, next) {
  try {
    const replysId = req.params.id;
    const {
        id_comment,
        createdBy,
        reply
    } = req.body;
    const replys = await model.reply.update({
        id_comment,
        createdBy,
        reply
    }, {
      where: {
        id: replysId
      }
    });
    if (replys) {
      res.json({
        'status': 'OK',
        'messages': 'reply berhasil diupdate',
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

// UPDATE replys
router.put('/', async function (req, res, next) {
  try {
    const {
        id_comment,
        createdBy,
        reply
    } = req.body;
    const replys = await model.reply.update({
        id_comment,
        createdBy,
        reply
    }, {
      where: {
        id: req.body.id
      }
    });
    if (replys) {
      res.json({
        'status': 'OK',
        'messages': 'reply berhasil diupdate',
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

// DELETE replys
router.delete('/:id', async function (req, res, next) {
  try {
    const replysId = req.params.id;
    const replys = await model.reply.destroy({ where: {
      id: replysId
    }})
    if (replys) {
      res.json({
        'status': 'OK',
        'messages': 'reply berhasil dihapus',
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