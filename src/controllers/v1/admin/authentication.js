const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const otpGenerator = require("otp-generator");

const Admin = require("./../../../models/v1/admin");
const keys = require("./../../../config/keys");
const {sendEmail} = require("../../../utils/emails");


exports.register = async (req, res) => {
    try {
        // add recommendation logic
        const {name, password, phone, email} = req.body;
        if (!password || !phone || !name || !email)
            return res.status(400).json({message: 'Missing required fields'});
        const existingAdmin = await Admin.findOne({$or: [{phone}, {email}]});
        if (existingAdmin)
            return res.status(409).json({message: 'Admin name or phone or email already taken'});

        const admin = await Admin.create({
            name,
            phone,
            email,
            password: await bcrypt.hash(password, 10),
        });
        res.status(201).json({message: 'Account created successfully.', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingAdmin = await Admin.findOne({email});
        if (!existingAdmin)
            return res.status(401).json({message: 'Auth Failed'});
        if (!await bcrypt.compare(password, existingAdmin.password))
            return res.status(401).json({message: 'Auth Failed'});
        if (existingAdmin.status === 'pending')
            return res.status(400).json({message: 'Please verify your account'});

        const token = jwt.sign(
            {_id: existingAdmin._id.toString()},
            keys.jwtSecret,
            {expiresIn: '24h'},
            null
        );
        await existingAdmin.save();
        res.status(200).json({message: 'Check your email to verify otp.', data: existingAdmin, token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'phone'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed)
            return res.status(400).json({message: 'Update not allowed'});
        for (let key of updates) {
            if (key === 'phone') {
                const existingAdmin = await Admin.findOne({phone: key});
                if (existingAdmin)
                    return res.status(409).json({message: 'Phone number already taken'});
                else req.admin[key] = req.body[key];
            } else {
                req.admin[key] = req.body[key];
            }
        }
        await req.admin.save();
        res.status(200).json({message: 'Profile updated successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.changePassword = async (req, res) => {
    try {
        const {currentPassword, password} = req.body;
        if (!await bcrypt.compare(currentPassword, req.admin.password))
            return res.status(401).json({message: 'Incorrect Pin'});
        req.admin.password = await bcrypt.hash(password, 10);
        await req.admin.save();
        const token = jwt.sign(
            {_id: req.admin._id.toString()},
            keys.jwtSecret,
            {expiresIn: '24h'},
            null
        );

        req.admin.authInfo = {
            token,
            expiryDate: moment().add(1, 'hour')
        };

        const link = `https://cargoserviceslimitedadmin.vercel.app/auth/reset-password?token=${token}`;
        const message = `You have successfully changed your password. If you did not perform this operation, use the link ${link} to reset your password`;
        // await sendSMS(req.admin.phone, message);
        const subject = `Cargo Services Limited Reset Password Confirmation`;
        await sendEmail(req.admin.email, subject, message);
        res.status(200).json({message: 'Password changed successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deactivateProfile = async (req, res) => {
    try {
        const {pin} = req.body;
        if (!await bcrypt.compare(pin, req.admin.pin))
            return res.status(401).json({message: 'Incorrect Pin'});
        req.admin.status = 'frozen';
        const message = `We are sorry to see you go. We hope you come back and get even higher.`;
        await req.admin.save();
        // await sendSMS(req.admin.phone, message);
        const subject = `Account Deactivated`;
        await sendEmail(req.admin.email, subject, message);
        res.status(200).json({message: 'Profile deactivated successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}



exports.deleteProfile = async (req, res) => {
    try {
        const {pin} = req.body;
        if (!await bcrypt.compare(pin, req.admin.pin))
            return res.status(401).json({message: 'Incorrect Pin'});
        req.admin.status = 'deleted';
        const message = `We are sorry to see you go. We hope you come back and get even higher.`;
        await req.admin.save();
        // await sendSMS(req.admin.phone, message);
        const subject = `Profile Delete Notice`;
        await sendEmail(req.admin.email, subject, message);
        res.status(200).json({message: 'Profile deleted successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.resendOTP = async (req, res) => {
    try {
        const {emailOrUsername} = req.body;
        const existingAdmin = await Admin.findOne({
            $or: [
                {username: emailOrUsername},
                {email: emailOrUsername}
            ]
        });

        if (!existingAdmin)
            return res.status(404).json({
                message: 'No admin associated with the provided username, email or password'
            })
        const otp = otpGenerator.generate(parseInt(keys.otpLength), {
            digits: true,
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false
        });
        const token = jwt.sign(
            {_id: existingAdmin._id.toString()},
            keys.jwtSecret,
            {expiresIn: '24h'},
            null
        );
        existingAdmin.authInfo = {
            otp,
            expiryDate: moment().add(1, 'hour'),
            token
        }
        await existingAdmin.save();
        const message = `Your OTP is ${otp}. OTP expires in 1 hour`;
        // await sendSMS(phone, message);
        const subject = `Cargo Services Limited OTP`;
        await sendEmail(existingAdmin.email, subject, message);

        res.status(200).json({message: 'OTP sent successfully', token});
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message});
    }
}


exports.logout = async (req, res) => {
    try {
        req.admin.devices.filter(device => device.token !== req.token);
        await req.admin.save();
        res.status(201).json({message: 'Logged out successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.logoutAll = async (req, res) => {
    try {
        req.admin.devices = [];
        await req.admin.save();
        res.status(200).json({message: 'Successfully logged out of all devices'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.verifyProfile = async (req, res) => {
    try {
        const {token} = req.params;
        const {otp} = req.body;
        if (!otp)
            return res.status(400).json({message: 'Missing required field otp'});

        const admin = await Admin.findOne(
            {$and: [{"authInfo.token": token}, {"authInfo.otp": otp}]}
        );
        if (!admin)
            return res.status(401).json({message: 'Incorrect otp'});
        if (moment().isAfter(admin.authInfo.expiryDate))
            return res.status(400).json({message: 'Token expired'});
        admin.status = 'active';
        admin.authInfo = {};
        await admin.save();
        res.status(200).json({message: 'Profile verified successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const {token} = req.query;
        const {password} = req.body;
        jwt.verify(token, keys.jwtSecret, null, null);
        const admin = await Admin.findOne({"authInfo.token": token});
        if (!admin)
            return res.status(404).json({message: 'Admin not found'});
        admin.password = await bcrypt.hash(password, 10);
        await admin.save();
        res.status(200).json({message: 'Password changed successfully'});
    } catch (e) {
        res.status(401).json({message: e.message});
    }
}


exports.getProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Profile retrieved successfully',
            data: req.admin,
            token: req.token
        });
    } catch (e) {
        console.log(e.message);
        res.status(401).json({message: e.message});
    }
}
