const Maintenance = require('../models/Maintenance');

exports.createMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenance(req.body);
        const savedMaintenance = await maintenance.save();
        res.status(201).json(savedMaintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.find();
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });

        Object.keys(req.body).forEach(key => {
            if (key !== '_id') {
                maintenance[key] = req.body[key];
            }
        });

        maintenance.updatedAt = new Date();
        const updatedMaintenance = await maintenance.save();
        res.json(updatedMaintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
        res.json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};