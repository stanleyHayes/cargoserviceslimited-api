const express = require("express");
const {createMessage} = require("../../../controllers/v1/user/messages");

const router = express.Router({mergeParams: true});

router.route("/").post(createMessage)

module.exports = router;
