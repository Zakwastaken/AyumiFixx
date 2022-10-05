const mongoose = require('mongoose');

const LeaveMsgSchema = new mongoose.Schema({
  ByeMsg: {
    type: String
  },
  GuildID: String
});

module.exports = mongoose.model('leavemsg', LeaveMsgSchema);