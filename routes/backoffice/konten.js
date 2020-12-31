var express = require('express');
var router = express.Router();
const model = require('../../models/index');
var save = require('summernote-nodejs');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var multer  = require('multer')
const path = require('path');
var slugify = require('slugify')


const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/content/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.session.admin) {
    res.redirect('/auth');
  }else {
    try {
      const data = await model.content.findAll({include:['category','user']});
      if (data) {
        res.render('./backoffice/konten',{ data: data,  name: req.session.username, role: req.session.role });
      } else {
        
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

// POST contents
router.post('/', multer({ storage: diskStorage }).single("photo"), async function (req, res) {
  try {
    const {
      id_category,
      title,
      desc,
      slug,
      view,
      last_view,
      share
    } = req.body;
    var user = req.session.code
    const contents = await model.content.create({
        id_category: id_category,
        title: title,
        desc : save(desc),
        slug : slugify(slug),
        thumbnail: req.file.filename,
        view : view,
        last_view : last_view,
        share : share,
        createdBy : user.toString()
    });
  if (contents) {
     res.redirect('/admin/konten');  
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message
   })
 }
});

// UPDATE contents
router.post('/:id', multer({ storage: diskStorage }).single("photo"), async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const {
        id_category,
        title,
        desc,
        slug,
        view,
        last_view,
        share
    } = req.body;
    const contents = await model.content.update({
        id_category: id_category,
        title: title,
        desc : save(desc),
        slug : slugify(slug),
        view : view,
        last_view : last_view,
        share : share
    }, {
      where: {
        id: usersId
      }
    });
    if (contents) {
      res.redirect('/admin/konten');
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
    const getimg = await model.content.findOne({
      where: {
        id: contentsId
      }
    });

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
