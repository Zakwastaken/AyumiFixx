const mongoose = require('mongoose')

const antilinkSchema = new mongoose.Schema({
    GuildID: String,
});

module.exports = mongoose.model('antilink', antilinkSchema)