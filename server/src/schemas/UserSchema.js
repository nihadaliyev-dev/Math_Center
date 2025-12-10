const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    isSuperAdmin: { type: Boolean, default: false },
    researcherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Researcher' },
    hideFromResearchers: { type: Boolean, default: false } // Flag to hide from researchers list
}, { timestamps: true });

module.exports = userSchema;
