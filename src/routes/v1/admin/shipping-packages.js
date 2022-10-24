const express = require("express");
const {
    addPackage, addPackages, removePackage, updatePackage, getPackage, getPackages
} = require("../../../controllers/v1/admin/shipping-packages");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, addPackages).get(authenticate, getPackages);
router.route('/:id')
    .post(authenticate, addPackage)
    .get(authenticate, getPackage)
    .put(authenticate, updatePackage)
    .delete(authenticate, removePackage);

module.exports = router;
