const express = require('express');
const router = express.Router();
const model = require('../../models/index');

// GET tagss listing.
router.get('/', async function (req, res, next) {
  try {
    const tagss = await model.tags.findAll({});
    if (tagss.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': tagss
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
    const tagssId = req.params.id;
    const tagss = await model.tags.findAll({
      where: {
        id: tagssId
      }
    });
    if (tagss.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': tagss
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

// POST tagss
router.post('/', async function (req, res, next) {
  try {
    const {
      name,
      desc,
      createdBy
    } = req.body;
    const tagss = await model.tags.create({
        name,
        desc,
        createdBy
    });
  if (tagss) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'tags berhasil ditambahkan',
      'data': tagss,
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

// UPDATE tagss
router.patch('/:id', async function (req, res, next) {
  try {
    const tagssId = req.params.id;
    const {
        name,
        desc,
        createdBy
    } = req.body;
    const tagss = await model.tags.update({
        name,
        desc,
        createdBy
    }, {
      where: {
        id: tagssId
      }
    });
    if (tagss) {
      res.json({
        'status': 'OK',
        'messages': 'tags berhasil diupdate',
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

// UPDATE tagss
router.put('/', async function (req, res, next) {
  try {
    const {
        name,
        desc,
        createdBy
    } = req.body;
    const tagss = await model.tags.update({
        name,
        desc,
        createdBy
    }, {
      where: {
        id: req.body.id
      }
    });
    if (tagss) {
      res.json({
        'status': 'OK',
        'messages': 'tags berhasil diupdate',
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

// DELETE tagss
router.delete('/:id', async function (req, res, next) {
  try {
    const tagssId = req.params.id;
    const tagss = await model.tags.destroy({ where: {
      id: tagssId
    }})
    if (tagss) {
      res.json({
        'status': 'OK',
        'messages': 'tags berhasil dihapus',
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