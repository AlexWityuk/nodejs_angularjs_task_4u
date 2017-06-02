var model = require('../models/personnel_time');

function getAllUsersByPage(req, res, next) {
    var page = parseInt(req.params.id);
    var forAllUsers = {};
    model.getAllUsersByPage(page, function (results) {
        forAllUsers.allUsers = results;
        model.getCount(function (results) {
            forAllUsers.count = results;
            console.log(forAllUsers.count);
            console.log(forAllUsers.allUsers);
            res.json(forAllUsers);
            res.end();
        });
    });
}

function getSingleUser(req, res, next) {
    var pupID = parseInt(req.params.id);
    model.getSingleUser(pupID, function (results){
        console.log(results);
        res.json(results);
        res.end();
    });
}

function updateUser(req, res, next) {
    var pupID = parseInt(req.params.id);
    console.log(pupID);
    console.log(req.body);
    model.updateUser(req.body, pupID, function(results){
        res.send('results');
        res.end();
    });
}

function removeUser(req, res, next) {
    var pupID = parseInt(req.params.id);
    model.removeUser(pupID, function(results){
        res.send(req.params.id + ' delete');
    });
}

function getSearchUsers (req, res, next){
    var arr = req.body.search.split(' ');
    model.getSearchUsers(arr, function(results){
        console.log('home search: ' + results);
        res.send(results);
        res.end();
    });
}

module.exports = {
    getAllUsersByPage: getAllUsersByPage,
    getSingleUser: getSingleUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getSearchUsers: getSearchUsers
};