var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.cookies.user && req.cookies.user.user === 'p1yebcv3764cvb19348fyubgd48c7r9627rbc0cr87fg9n4cybgrq87vwavrtvycbfn4g7q8r7vbtcf9n67w4tvb6cfb9q'){
  res.render('admin', {title:'qrwerqwerw'})
  } else {
    res.render('login', {title:'u r nit auth!!!!!'})
  }
});

module.exports = router;
