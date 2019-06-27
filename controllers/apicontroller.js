const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Details = mongoose.model('Details');

router.get('/', (req, res) => {
    res.render("details/addOrEdit", {
        viewTitle: " Enter Information"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var details = new Details();
    details.userName = req.body.userName;
   
    details.address = req.body.address;
    details.ID = req.body.ID;
    details.save((err, doc) => {
        if (!err)
            res.redirect('details/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("details/addOrEdit", {
                    viewTitle: "Enter Information",
                    details: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Details.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('details/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("details/addOrEdit", {
                    viewTitle: 'Update Information',
                    details: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Details.find((err, docs) => {
        if (!err) {
            res.render("details/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving details list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'userName':
                body['userNameError'] = err.errors[field].message;
                break;
          
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Details.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("details/addOrEdit", {
                viewTitle: "Update Information",
                details: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Details.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/details/list');
        }
        else { console.log('Error in details delete :' + err); }
    });
});

module.exports = router;