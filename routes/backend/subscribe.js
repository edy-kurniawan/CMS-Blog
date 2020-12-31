const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET subscribes listing.
router.get('/', async function (req, res, next) {
  try {
    const subscribes = await model.subscribe.findAll({});
    if (subscribes.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': subscribes
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
    const subscribesId = req.params.id;
    const subscribes = await model.subscribe.findAll({
      where: {
        id: subscribesId
      }
    });
    if (subscribes.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': subscribes
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

// POST subscribes
router.post('/', async function (req, res, next) {
  try {
    const {
      email
    } = req.body;
    const subscribes = await model.subscribe.create({
      email
    });
  if (subscribes) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'subscribe berhasil ditambahkan',
      'data': subscribes,
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

// UPDATE subscribes
router.patch('/:id', async function (req, res, next) {
  try {
    const subscribesId = req.params.id;
    const {
      email
    } = req.body;
    const subscribes = await model.subscribe.update({
      email
    }, {
      where: {
        id: subscribesId
      }
    });
    if (subscribes) {
      res.json({
        'status': 'OK',
        'messages': 'subscribe berhasil diupdate',
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

// UPDATE subscribes
router.put('/', async function (req, res, next) {
  try {
    const {
      email
    } = req.body;
    const subscribes = await model.subscribe.update({
      email
    }, {
      where: {
        id: req.body.id
      }
    });
    if (subscribes) {
      res.json({
        'status': 'OK',
        'messages': 'subscribe berhasil diupdate',
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

// DELETE subscribes
router.delete('/:id', async function (req, res, next) {
  try {
    const subscribesId = req.params.id;
    const subscribes = await model.subscribe.destroy({ where: {
      id: subscribesId
    }})
    if (subscribes) {
      res.json({
        'status': 'OK',
        'messages': 'subscribe berhasil dihapus',
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