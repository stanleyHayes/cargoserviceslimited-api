const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");
const {
    updateMessage,
    getMessages,
    getMessage,
    deleteMessage
} = require("./../../../controllers/v1/admin/messages");

const router = express.Router({mergeParams: true});

router.route("/").get(authenticate, getMessages);

router.route('/:id')
    .get(authenticate, getMessage)
    .put(authenticate, updateMessage)
    .delete(authenticate, deleteMessage);

module.exports = router;
