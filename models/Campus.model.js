const mongoose = require("mongoose");

const CampusSchema = new mongoose.Schema(
    {
        campusName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 250
        },
        campusCode: {
            type: String,
            trim: true
        },
        address: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campus", CampusSchema, "Campus");
