const express = require('express');
const router = express.Router();
const model = require('../../models/index');
var sha1 = require('sha1');

// GET users listing.
router.get('/', async function (req, res, next) {
  
  model.user.findAll()
    .then(result => {
      res.json({
        data: {
          id: result
        }
      })
    })
  
});

//GET by ID
router.get('/:id', async function (req, res, next) {
  if (!req.session.admin) {
    res.send("Unauthorize");
  } else {
    try {
      const usersId = req.params.id;
      const users = await model.user.findOne({
        where: {
          id: usersId
        }
      });
      if (users.length !== 0) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': users
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
  }
});

// POST users
router.post('/', async function (req, res, next) {
  if (!req.session.admin) {
    res.send("Unauthorize");
  } else {
    try {
      const {
        name,
        email,
        username,
        password,
        role
      } = req.body;
      const users = await model.user.create({
        username: username,
        password: sha1(password),
        email: email,
        name: name,
        role: role
      });
      if (users) {
        res.redirect('/admin/admin');
        res.status(201).json({
          'status': 'OK',
          'messages': 'User berhasil ditambahkan',
          'data': users,
        })
      }
    } catch (err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    }
  }
});

// UPDATE users
router.patch('/:id', async function (req, res, next) {
  if (!req.session.admin) {
    res.send("Unauthorize");
  } else {
    try {
      const usersId = req.params.id;
      const {
        name,
        email,
        username,
        password,
        role
      } = req.body;
      const users = await model.user.update({
        name,
        email,
        username,
        password,
        role
      }, {
        where: {
          id: usersId
        }
      });
      if (users) {
        res.json({
          'status': 'OK',
          'messages': 'User berhasil diupdate',
        })
      }
    } catch (err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    }
  }
});

// UPDATE users
router.put('/', async function (req, res, next) {
  if (!req.session.admin) {
    res.send("Unauthorize");
  } else {
    try {
      const {
        name,
        email,
        username,
        password,
        role
      } = req.body;
      const users = await model.user.update({
        name,
        email,
        username,
        password,
        role
      }, {
        where: {
          id: req.body.id
        }
      });
      if (users) {
        res.json({
          'status': 'OK',
          'messages': 'User berhasil diupdate',
        })
      }
    } catch (err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    }
  }
});

// DELETE users
router.delete('/:id', async function (req, res, next) {
  if (!req.session.admin) {
    res.send("Unauthorize");
  } else {
    try {
      const usersId = req.params.id;
      const users = await model.user.destroy({
        where: {
          id: usersId
        }
      })
      if (users) {
        res.json({
          'status': 'OK',
          'messages': 'User berhasil dihapus',
        })
      }
    } catch (err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    }
  }
});

module.exports = router;