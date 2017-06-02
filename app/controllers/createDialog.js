var model = require('../models/employees');

function createEmployer (req, res, next){
    model.createEmployer(req.body, function(result){
        res.send('nice');
        res.end();
    });
}

module.exports = {
    createEmployer: createEmployer
};