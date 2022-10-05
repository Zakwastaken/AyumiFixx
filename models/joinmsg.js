const mongoose = require('mongoose');

const JoinMsgSchema = new mongoose.Schema({
  JoinMsg: {
    type: String
  },
  GuildID: String
});

module.exports = mongoose.model('joinmsg', JoinMsgSchema);
