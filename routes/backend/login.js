const express = require('express');
const router = express.Router();
const model = require('../../models/index');
var sha1 = require('sha1');

//cek login
router.post('/', async function (req, res, next) {
    try {
      const Username = req.body.username;
      const Password = req.body.password;
      const users = await model.user.findOne({
        where: {
          username : Username,
          password : sha1(Password)
        }
      });

      if (users) {
        req.session.users = {
          username : users.username,
          role : users.role
        };
        /* res.redirect('/admin'); */
      } else {
        res.status(500).json({
            status:false,
            data:"Username atau Password Salah!"
        });
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