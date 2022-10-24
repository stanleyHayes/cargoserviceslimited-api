const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");
const {addStage} = require("../../../controllers/v1/admin/shipment-stage");

const router = express.Router({mergeParams: true});

router.route('/:shipmentID').post(authenticate, addStage);

module.exports = router;
