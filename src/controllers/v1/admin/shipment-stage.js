const Shipment = require("./../../../models/v1/shipment");

exports.addStage = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.shipmentID);
        const {location, name} = req.body;
        if(!shipment)
            return res.status(404).json({message: 'Shipment not found'});
        shipment.stages.push({location, name, order: shipment.stages.length + 1});
        await shipment.save();
        res.status(200).json({message: 'Stage added', data: shipment});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
