const express = require("express");
const {tracking} = require("../../../controllers/v1/user/tracking");

const router = express.Router({mergeParams: true});

router.route('/:tracking').get(tracking);

module.exports = router;
