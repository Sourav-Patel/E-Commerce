const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    stock:{
        type:Boolean,
        required: true
    },

    manufacture_details: {
        name: {
            type: String,
            required: true
        },
        launch_date: {
            type: String,
            required: true
        },
        expiry_date: {
            type: String,
            required: true
        },
        model_number: {
            type: String,
            required: true
        },
    },

    price: {
        regular_price: {
            type: Number,
            required: function () { return this.stock }
        },
        discount_price: {
            type: Number,
        }
    },

    shipping_details: {
        weight: Number,
        width: Number,
        height: Number,
        depth: Number,
        cod: Boolean
    },

    reviews: [{
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review_title: {
            type: String,
            required: true
        },
        review_description: String,
        published_date: {
            type: Date,
            default: Date.now
        }

    }],

    images: [{
        type: String,
        required: true
    }],
    idealFor: {
        men: Boolean,
        women: Boolean,
        unisex: Boolean
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Product", productSchema);
