const express = require("express");
const {authenticate} = require("./../../../middleware/v1/admin/authenticate");
const {getDashboard} = require("./../../../controllers/v1/admin/dashboard");

const router = express.Router({mergeParams: true});

router.get('/', authenticate, getDashboard);

module.exports = router;
