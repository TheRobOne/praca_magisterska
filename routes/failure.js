const express = require('express');
const router = express.Router();

let Failure = require('../models/failure');

router.get('/', (req, res, next) => {
    Failure.getFailures((err, failures) => {
        if(err) throw err;
        res.json(failures);
    });
});

router.get('/:id', (req, res, next) => {
    Failure.getFailureById(req.params.id, (err, failure) => {
        if(err) throw err;
        res.json(failure);
    });
});

router.post('/', (req, res, next) => {
    Failure.addFailure(req.body, (err, failure) => {
        if(err) throw err;
        res.json({"message": "failure added successfuly"});
    });
})

router.put('/:id', (req, res, next) => {
    Failure.updateFailure(req.params.id, req.body, (err, failure) => {
        if(err) throw err;
        Failure.getFailureById(req.params.id, (err, failure) => {
            if(err) throw err;
            res.json(failure);
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Failure.removeFailure(req.params.id, (err, failure) => {
        if(err) throw err;
        res.json({"message": "delete successfuly"});
    });
});

module.exports = router;