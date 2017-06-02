var home = require('../app/controllers/home');
var createDialog = require('../app/controllers/createDialog');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users/:id',home.getAllUsersByPage);
router.get('/user/:id', home.getSingleUser);
router.put('/users/:id', home.updateUser);
router.post('/insert', createDialog.createEmployer);
router.delete('/users/:id', home.removeUser);
router.post('/search/users', home.getSearchUsers);

module.exports = router;
