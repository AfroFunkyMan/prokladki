var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  res.render('index', { title: 'Main' });
});

router.get('/:company', function(req, res, next) {
  req.app.get('mongodb').collection('company').findOne({url:req.params.company}, function(err, company){
    if (err) next(new Error('not find that company'));
    else {
      if (company) res.render('index', {title:'express'});
      else next(new Error('not find that company'));
    }
  });
});

module.exports = router;
