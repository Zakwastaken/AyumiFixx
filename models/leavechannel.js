  
const mongoose = require('mongoose');

const goodbyeSchema = new mongoose.Schema({
  Bye: {
    type: String,
  },
  GuildID: String
});

module.exports = mongoose.model('goodbye', goodbyeSchema);
