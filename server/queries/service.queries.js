const Service = require('../models/service.model');

exports.getService = (serviceId) => {
    return Service.findById(serviceId).exec();
}

exports.findByIdAndUpdate = (id, service) => {
    return Service.findByIdAndUpdate({ _id: id }, service);
}

exports.findAll = () => {
    return Service.find();
}