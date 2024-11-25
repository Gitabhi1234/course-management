const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: String,
    description: String,
    group_id:String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'admin' }]
});

module.exports = mongoose.model("group", groupSchema);
