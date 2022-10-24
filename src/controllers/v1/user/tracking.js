const Shipment = require("./../../../models/v1/shipment");

exports.tracking = async (req, res) => {
    try {
        const {tracking} = req.params;
        const shipment = await Shipment.findOne({tracking}).populate({
            path: 'sender',
            select: 'firstName lastName email phone'
        });
        if (!shipment)
            return res.status(404).json({message: `No shipment associated with tracking id ${tracking}`});
        res.status(200).json({message: 'Shipment retrieved', data: shipment});
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}
