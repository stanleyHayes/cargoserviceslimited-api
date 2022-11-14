const otpGenerator = require("otp-generator");

const Shipment = require("./../../../models/v1/shipment");

exports.createShipments = async (req, res) => {
    try {
        const {origin, recipient, mode, packages, totalCost, destination, sender} = req.body;

        const shipment = await Shipment.create({
            tracking: otpGenerator.generate(10, {
                lowerCaseAlphabets: false,
                digits: true,
                upperCaseAlphabets: true,
                specialChars: false
            }),
            sender,
            mode,
            totalCost,
            recipient,
            origin,
            packages,
            destination,
            stages: [{order: 1, name: 'Shipment Created', date: Date.now(), location: 'Cargo Services Limited, USA'}]
        });
        res.status(201).json({message: 'Shipments Added', data: shipment});
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}

exports.getShipment = async (req, res) => {
    try {
        const {id} = req.params;
        const shipment = await Shipment.findById(id);
        if (!shipment) return res.status(404).json({message: 'Shipment not found'});
        res.status(200).json({message: 'Shipment Retrieved', data: shipment});
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}

exports.getShipments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.status) {
            match['status'] = req.query.status;
        }
        if (req.query.mode) {
            match['mode'] = req.query.mode;
        }
        if (req.query.search) {
            match['tracking'] = req.query.tracking;
        }
        const shipments = await Shipment.find(match).limit(limit).skip(skip).sort({createdAt: -1});
        const totalShipments = await Shipment.find(match).countDocuments();
        res.status(200).json({
            message: `${shipments.length} shipment${shipments.length === 1 ? '' : 's'} retrieved`,
            count: totalShipments,
            data: shipments
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
    }
}
