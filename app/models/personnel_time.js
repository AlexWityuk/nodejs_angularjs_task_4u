var db = require('../../config/dbconnect');

function getAllUsersByPage(page, cb) {
    var limit = 5;
    var offset = 4 * (page-1);
    console.log('offset: ' + offset);
    db.any('select employees.id as id, employees.fio as fio, personnel_time.date as date, personnel_time.start_time as start_time,' +
    'personnel_time.end_time as end_time ' +
    'from employees, personnel_time ' +
    'where personnel_time.employees_id = employees.id ' +
    'ORDER BY personnel_time.date DESC LIMIT $1 OFFSET $2', [limit, offset])
        .then(function (found) {
            cb(found);
        })
        .catch(function (err) {
            cb(err);
        });
}

function getCount (cb){
    db.one("SELECT COUNT(id)as count FROM personnel_time")
        .then(function (found) {
            cb(found);
        })
        .catch(function (err) {
            cb(err);
        });
}

function getSingleUser(pupID, cb) {
    db.one('select employees.id as id, employees.fio as fio,employees.sex as sex , employees.contact as contact ,' +
        ' personnel_time.date as date, personnel_time.start_time as start_time,' +
            'personnel_time.end_time as end_time ' +
            'from employees, personnel_time ' +
            'where personnel_time.employees_id = employees.id ' +
            'and employees.id = $1 ', pupID)
        .then(function (found) {
            cb(found);
        })
        .catch(function (err) {
            cb(err);
        });
}

function updateUser(reqbody, userid, cb) {
    var fio = reqbody.Nameupdate + ' ' +  reqbody.Familyupdate;
    db.none('UPDATE employees SET fio=$1, sex=$2, contact = $3 '+
        ' WHERE employees.id = $4', [reqbody.fio, reqbody.sex, reqbody.contact, userid])
        .then(function () {
            updatePersonnel_time(reqbody, userid);
            cb('nice');
        })
        .catch(function (err) {
        });
}

function updatePersonnel_time(reqbody, userid) {
    var fio = reqbody.Nameupdate + ' ' +  reqbody.Familyupdate;
    db.none('UPDATE personnel_time SET start_time=$1, end_time=$2, date = $3 '+
            ' WHERE employees_id = $4', [reqbody.start_time, reqbody.end_time, reqbody.date, userid])
        .then(function () {
        })
        .catch(function (err) {
        });
}

function removeUser(pupID, cb) {
    db.result('delete from employees where id = $1', pupID)
        .then(function (result) {
            cb(result);
        })
        .catch(function (err) {
        });
}

function getSearchUsers (arr, cb){
    db.any('select DISTINCT ON (employees.id) employees.fio as fio,employees.sex as sex , employees.contact as contact ,' +
            ' personnel_time.date as date, personnel_time.start_time as start_time,' +
            'personnel_time.end_time as end_time ' +
            'from employees, personnel_time ' +
            'where personnel_time.employees_id = employees.id ' +
            'and split_part(employees.fio,' + "' '" +', 1 ) like any($1::text[]) '+
            'OR split_part(employees.fio,' + "' '" +', 2 ) like any($1::text[])' ,[arr])
        .then(function (data) {
            cb(data);
        })
        .catch(function (err) {
        });
}

module.exports = {
    getAllUsersByPage: getAllUsersByPage,
    getCount: getCount,
    getSingleUser: getSingleUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getSearchUsers: getSearchUsers
};
