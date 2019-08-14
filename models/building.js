const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rooms: [Number]
});

let Building = module.exports = mongoose.model('Building', buildingSchema);

//get buildings
module.exports.getBuildigns = (callback, limit) => {
    Building.find(callback).limit(limit);
};

//get building by id
module.exports.getBuildingById = (id, callback) => {
    Building.findById(id, callback);
};

//add new building
module.exports.addBuilding = (building, callback) => {
    Building.create(building, callback);
}

//update building
module.exports.updateBuilding = (id, building, callback) => {
    const query = {
        name: building.name,
        rooms: building.rooms
    };
    Building.findByIdAndUpdate(id, query, callback);
}

//remove Building
module.exports.removeBuilding = (id, callback) => {
    Building.findByIdAndRemove(id, callback);
};