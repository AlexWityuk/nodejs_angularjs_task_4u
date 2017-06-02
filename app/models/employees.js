var db = require('../../config/dbconnect');

function  createEmployer (reqbody, cb){
    var fio = reqbody.Family + ' ' +  reqbody.Name + ' ' + reqbody.Lastname;
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() +1) + "-"
        + currentdate.getDate();
    db.one('INSERT INTO employees(fio, sex, contact, date_in)' +
            'VALUES ($1, $2, $3, $4) RETURNING id AS last_id',
        [fio, reqbody.sex, reqbody.contact, datetime])
        .then(function (last_id) {
            console.log(last_id);
            insertPersonnel_time(last_id, datetime);
            cb(last_id);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function insertPersonnel_time(data, datetime){
    db.none('INSERT INTO personnel_time(employees_id, date)' +
            'VALUES ($1, $2)',
        [Object.values(data)[0], datetime])
        .then(function () {
        })
        .catch(function (err) {
        });
}

module.exports = {
    createEmployer: createEmployer
};
