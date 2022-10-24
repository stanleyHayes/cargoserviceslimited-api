const Admin = require("./../../../models/v1/admin");

const createAdmin = async (req, res) => {
    try {
        const {
            email,
            name,
            phone,
            password,
        } = req.body;
        const existingAdmin = await Admin.findOne({email});
        if (existingAdmin) {
            return res.status(400).json({message: `Admin with email ${email} already exists`});
        }
        const admin = await Admin.create({
            name,
            phone,
            password,
            email
        });
        res.status(201).json({message: 'Admin created successfully', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const getAdmins = async (req, res) => {
    try {
        const {status} = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 20;
        const skip = (page - 1) * limit;
        const match = {};
        if (status) {
            match['status'] = status;
        }
        const admins = await Admin.find(match)
            .skip(skip).limit(limit)
            .sort({createdAt: -1});

        const totalAdmins = await Admin.find(match).countDocuments();
        res.status(200).json({message: 'Admins retrieved successfully', data: admins, count: totalAdmins});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const getAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({message: 'Admin not found'});
        }
        res.status(200).json({message: 'Admin retrieved successfully', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const updateAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id).populate({path: 'admin'});
        if (!admin) {
            return res.status(404).json({message: 'Admin does not exist'});
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'status'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) {
            return res.status(400).json({message: 'Updates not allowed'});
        }
        for (let key of updates) {
            admin[key] = req.body[key];
        }
        await admin.save();
        res.status(200).json({message: 'Admin updated successfully', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({message: 'Admin does not exist'});
        }
        await admin.remove();
        res.status(200).json({message: 'Admins deleted successfully', data: admin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = {createAdmin, getAdmins, deleteAdmin, updateAdmin, getAdmin};
