const express = require("express");
const {
    createShipments, getShipment, getShipments, deleteShipment
} = require("../../../controllers/v1/admin/shipments");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createShipments).get(getShipments);
router.route('/:id').get(authenticate, getShipment).delete(authenticate, deleteShipment);

module.exports = router;
