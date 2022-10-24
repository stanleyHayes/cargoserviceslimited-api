const express = require("express");
const {authenticate} = require("./../../../middleware/v1/admin/authenticate");
const {getAdmins, createAdmin, getAdmin} = require("./../../../controllers/v1/admin/admins");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createAdmin).get(authenticate, getAdmins);
router.route('/:id').get(authenticate, getAdmin);

module.exports = router;
