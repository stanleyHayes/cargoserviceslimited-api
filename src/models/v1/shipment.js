const mongoose = require("mongoose");
const validator = require("validator");

const ShippingPackage = require("./shipping-package");

const shippingSchema = new mongoose.Schema({
    tracking: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    sender: {
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
    },
    origin: {
        country: {
            type: String,
            required: true,
            trim: true
        },
        stateOrRegionOrProvince: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    destination: {
        country: {
            type: String,
            required: true,
            trim: true
        },
        stateOrRegionOrProvince: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    recipient: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!validator.isMobilePhone(value)) {
                    throw new Error(`Invalid phone ${value}`);
                }
            }
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error(`Invalid email ${value}`);
                }
            }
        }
    },
    mode: {
        type: String,
        enum: ['air', 'sea'],
        required: true
    },
    stages: {
        type: [{
            order: {
                type: Number,
                default: 1
            },
            name: {
                type: String,
                required: true,
                default: 'Shipment Created'
            },
            date: {
                type: Date,
                default: Date.now()
            },
            location: {
                type: String,
                default: 'Gold Star Warehouse, UK'
            }
        }],
    },
    status: {
        type: String,
        enum: ['success', 'pending', 'failed', 'shipped'],
        default: 'pending'
    },
    totalCost: {
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR'],
            default: 'EUR'
        }
    },
    packages: {
        type: [ShippingPackage],
        required: true
    }
}, {
    timestamps: {createdAt: true},
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

shippingSchema.virtual('shippingPackage', {
    localField: '_id',
    foreignField: 'shipment',
    justOne: false,
    ref: 'ShippingPackage'
});

const Shipment = mongoose.model('Shipment', shippingSchema);

module.exports = Shipment;
