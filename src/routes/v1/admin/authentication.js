const express = require("express");
const {
    register, login, updateProfile, deleteProfile, deactivateProfile, changePassword,
    resetPassword, verifyProfile, logout, logoutAll, resendOTP, getProfile
} = require("../../../controllers/v1/admin/authentication");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");

const router = express.Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/logoutAll', authenticate, logoutAll);
router.put('/profile', authenticate, updateProfile);
router.get('/profile', authenticate, getProfile);
router.put('/profile/:token', verifyProfile);
router.delete('/profile', authenticate, deleteProfile);
router.delete('/profile/freeze', authenticate, deactivateProfile);
router.put('/passwords/change', authenticate, changePassword);
router.put('/passwords/reset', resetPassword);
router.post('/otp/resend', resendOTP);

module.exports = router;
