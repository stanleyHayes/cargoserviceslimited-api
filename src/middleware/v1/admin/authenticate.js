const jwt = require("jsonwebtoken");

const Admin = require("./../../../models/v1/admin");
const keys = require("./../../../config/keys");

exports.authenticate = async (req, res, next) => {
    try {
        if(!req.headers['authorization'])
            return res.status(400).json({message: 'Authorization header required!'});
        const [bearer, token] = req.headers['authorization'].split(' ');
        if(bearer !== 'Bearer' || !token)
            return res.status(400).json({message: 'Invalid header format'});
        const decoded = jwt.verify(token, keys.jwtSecret, null, null);
        const admin = await Admin.findOne({_id: decoded._id, "devices.token": token});
        if(!admin)
            return res.status(401).json({message: `Session expired. Please login again!`});
        req.admin = admin;
        req.token = token;
        next();
    }catch (e) {
        res.status(500).json({message: `Session expired. Please login again!`});
    }
}