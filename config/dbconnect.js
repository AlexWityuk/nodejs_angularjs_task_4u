var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString =  'postgres://postgres:1@localhost:5432/nodetask_4u';

var db = pgp(connectionString);
module.exports = db;
