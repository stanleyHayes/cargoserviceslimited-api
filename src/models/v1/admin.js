const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid phone number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password must include a lowercase, uppercase, digit, symbol and must be at least 8 characters long.')
            }
        }
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending', 'deleted', 'frozen'],
        default: 'pending'
    },
    role: {
        type: String,
        enum: ['admin', 'super_admin'],
        default: 'admin'
    },
    permissions: {
        testimonial: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        authentication: {
            register: {
                type: Boolean,
                default: false
            },
            login: {
                type: Boolean,
                default: false
            },
            updateProfile: {
                type: Boolean,
                default: false
            },
            getProfile: {
                type: Boolean,
                default: false
            },
            changePin: {
                type: Boolean,
                default: false
            },
            resetPin: {
                type: Boolean,
                default: false
            },
            resetPassword: {
                type: Boolean,
                default: false
            },
            changePassword: {
                type: Boolean,
                default: false
            },
            deleteProfile: {
                type: Boolean,
                default: false
            }
        },
        shipment: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        chat: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        },
        message: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            remove: {
                type: Boolean,
                default: false
            }
        }
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
