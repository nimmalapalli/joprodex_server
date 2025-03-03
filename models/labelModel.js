const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    showLogo: { type: Boolean, default: false }, // Show logo on label
    showSupportEmail: { type: Boolean, default: false }, // Show support email/mobile number
    hideCustomerMobile: { type: Boolean, default: false }, // Hide customer mobile number
    hideCustomerOrderBarcode: { type: Boolean, default: false }, // Hide customer order barcode

    warehouseSettings: {
        hidePickupAddress: { type: Boolean, default: false }, // Hide warehouse pickup address
        hideRtoAddress: { type: Boolean, default: false }, // Hide RTO address
        hideGstNumber: { type: Boolean, default: false }, // Hide GST number
        hideRtoContactName: { type: Boolean, default: false }, // Hide RTO contact name
        hideWarehouseContactNumber: { type: Boolean, default: false }, // Hide warehouse contact number
        hideWarehouseEmail: { type: Boolean, default: false }, // Hide warehouse email
    },

    productDetails: {
        hideSku: { type: Boolean, default: false }, // Hide SKU
        hideQty: { type: Boolean, default: false }, // Hide quantity
        hideProduct: { type: Boolean, default: false }, // Hide product name
        trimSkuUpTo: { type: Number, default: null }, // Trim SKU up to a certain length
        trimProductNameUpTo: { type: Number, default: null }, // Trim product name up to a certain length
        showLineItemsUpTo: { type: Number, default: null }, // Limit the number of line items to display
    },

    labelDimensions: {
        width: { type: Number, default: null }, // Label width
        height: { type: Number, default: null }, // Label height
    },

    fontSettings: {
        fontFamily: { type: String, default: 'Arial' }, // Font family for label text
        fontSize: { type: Number, default: 12 }, // Font size for label text
    },

    otherSettings: {
        showOrderDate: { type: Boolean, default: false }, // Show order date
        showDeliveryDate: { type: Boolean, default: false }, // Show delivery date
        hideTotalAmount: { type: Boolean, default: false }, // Hide total amount
        showDiscount: { type: Boolean, default: false }, // Show discount details
    },

    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
    updatedAt: { type: Date, default: Date.now }, // Timestamp for updates
});

// Middleware to update `updatedAt` field on save
settingsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Settings', settingsSchema);
