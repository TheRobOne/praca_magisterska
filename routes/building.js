const express = require('express');
const router = express.Router();

let Building = require('../models/building');

router.get('/', (req, res, next) => {
    Building.getBuildigns((err, buildings) => {
        if(err) throw err;
        res.json(buildings);
    });
});

router.get('/:id', (req, res, next) => {
    Building.getBuildingById(req.params.id, (err, building) => {
        if(err) throw err;
        res.json(building);
    });
});

router.post('/', (req, res, next) => {
    Building.addBuilding(req.body.building, (err, building) => {
        if(err) throw err;
        res.json(building);
    });
})

router.put('/:id', (req, res, next) => {
    Building.updateBuilding(req.params.id, req.body.building, (err, building) => {
        if(err) throw err;
        Building.getBuildingById(req.params.id, (err, building) => {
            if(err) throw err;
            res.json(building);
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Building.removeBuilding(req.params.id, (err, building) => {
        if(err) throw err;
        res.json({"message": "delete successfuly"});
    });
});

module.exports = router;