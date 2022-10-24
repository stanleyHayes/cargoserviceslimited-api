const mongoose = require("mongoose");

const shippingPackage = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    extras: {
        insured: {
            type: Boolean,
            default: false
        },
        fragile: {
            type: Boolean,
            default: false
        },
    },
    value: {
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
    quantity: {
        type: Number,
        default: 1
    },
    weight: {
        amount: {
            type: Number,
            min: 0,
            required: true
        },
        unit: {
            type: String,
            required: true,
            enum: ['lb', 'kg', 'g', 'mg'],
            default: 'g'
        }
    },
    dimensions: {
        width: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        },
        length: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        },
        height: {
            amount: {
                type: Number,
                min: 0,
                required: true
            },
            unit: {
                type: String,
                required: true,
                enum: ['m', 'cm', 'mm', 'km', 'in'],
                default: 'cm'
            }
        }
    }
}, {
    timestamps: {createdAt: true, updatedAt: true},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

module.exports = shippingPackage;
