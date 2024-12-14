const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    adminName: String,
    email: String,
    mobile: String,
    passwordHash: String,
    status: Number,
    tsCreatedAt: Number,
    tsModifiedAt: Number,
    profilePic: String,
});

module.exports = mongoose.model('Admins', AdminSchema, 'Admins');
