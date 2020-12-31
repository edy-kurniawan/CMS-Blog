var express = require('express');
var router = express.Router();
const model = require('../../models/index');
var moment = require('moment');

/* GET home page. */
router.get('/:id', async function (req, res, next) {
  try {
    const contentsId = req.params.id;
    const content = await model.content.findOne({
      where: {
        slug: contentsId
      },
      include: ['category', 'user']
    });

    const komentar = await model.comment.findAll({
      where: {
        id_content: content.id
      },
      include: ['user','reply']
    });

    const article = await model.content.findAll({
      include: 'user',
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: 3
    });

    // count view
    const idkonten = content.id;
    var ambildata = content.view;
    var tambah = ambildata + 1;
    const data = await model.content.update({
      view: tambah
    }, {
      where: {
        id: idkonten
      }
    });

    if (req.session.member) {
        res.render('frontend/single', {
          data: content,
          article: article,
          moment: moment,
          komentar: komentar,
          session: true,
          sessionname : req.session.user
        });
    } else {
      res.render('frontend/single', {
        data: content,
        article: article,
        moment: moment,
        komentar: komentar,
        session: false,
        sessionname:false
      });
      /* res.json({
        data:komentar
      }) */
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