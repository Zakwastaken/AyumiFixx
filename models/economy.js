const mongoose = require('mongoose');

const economySchema = new mongoose.Schema({
    userID: { type: String, required: true },
	createdAt: { type: Date, default: null },
	balance: Number,
	cash: Number,
	cooldowns: {
		WORK: Number,
		ROB: Number,
		ROLL: Number,
		TRANSFER: Number,
		WEEKLY: Number,
		BEG: Number,
		COLLECT: Number,
		CRIME: Number,
		DAILY: Number,
		GAMBLE: Number,
		MONTHLY: Number
	}
});

module.exports = mongoose.model('economyBalance', economySchema);