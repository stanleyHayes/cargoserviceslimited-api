const Shipment = require("./../../../models/v1/shipment");

const getDashboard = async (req, res) => {
    try {

        const latestShipments = await Shipment.find({})
            .populate({path: 'senderAccount', select: 'number name'})
            .populate({path: 'internal.recipientAccount', select: "name number"})
            .populate({path: 'internal.recipient', select: 'name email'})
            .limit(50).sort({updatedAt: -1});

        const pendingShipments = await Shipment.find({status: 'pending'}).countDocuments();
        const completedShipments = await Shipment.find({status: 'completed'}).countDocuments();
        const failedShipments = await Shipment.find({status: 'failed'}).countDocuments();

        res.status(200).json({
            message: 'Dashboard retrieved successfully', data: {
                latestShipments,
                transactions: {
                    pending: pendingShipments,
                    completed: completedShipments,
                    failed: failedShipments
                }
            }
        })
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = {getDashboard};
