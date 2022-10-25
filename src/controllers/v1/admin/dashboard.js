const Shipment = require("./../../../models/v1/shipment");

const getDashboard = async (req, res) => {
    try {
        const latestShipments = await Shipment.find({}).limit(50).sort({updatedAt: -1});
        const totalShipments = await Shipment.find({}).countDocuments();
        const pendingShipments = await Shipment.find({status: 'pending'}).countDocuments();
        const completedShipments = await Shipment.find({status: 'completed'}).countDocuments();
        const failedShipments = await Shipment.find({status: 'failed'}).countDocuments();

        res.status(200).json({
            message: 'Dashboard retrieved successfully', data: {
                latestShipments,
                stats: {
                    pending: {count: pendingShipments, percentage: totalShipments === 0 ? 0: pendingShipments / totalShipments * 100},
                    completed: {count: completedShipments, percentage: totalShipments === 0 ? 0: completedShipments / totalShipments * 100},
                    failed: {count: failedShipments, percentage: totalShipments === 0 ? 0: failedShipments / totalShipments * 100},
                }
            }
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}

module.exports = {getDashboard};
