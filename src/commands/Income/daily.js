const economyUser = require('../../../models/economy');
const { Permissions } = require('discord.js');
const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');

const COOLDOWN =  24 * 60 * 60 * 1000;

const randomNum = (max, min) => Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
const addMoney = async (userID, cash = 0) => {
	await economyUser.updateOne(
		{ userID },
		{ $set: { userID, 'cooldowns.DAILY': Date.now() + COOLDOWN }, $inc: { cash } },
		{ upsert: true }
	);
};

module.exports = {
	name: 'daily',
	description: 'Collect a reward every 24 hours.',
	usage: '',
	example: '',
	category: 'Income',
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

	execute: async (message, args, client, prefix) => {
		const data = await economyUser.findOne({ userID: message.author.id });
		if (data?.cooldowns?.DAILY > Date.now()) {
			const warning = new MessageEmbed()
			.setColor("RED")
			.setDescription(`⏱️・No! **${message.author.username},** You must wait **${ms(data.cooldowns.DAILY - Date.now())}.**`)
			return message.reply({ embeds: [warning] }).then((msg) => {
				let time = "5s";
				setTimeout(function () {
				  msg.delete();
				}, ms(time));
			  });
		}
		const earning = randomNum(100, 50);
		await addMoney(message.author.id, earning);
        const embed = new MessageEmbed()
		.setColor("#34eb95")
		.setDescription(`<:check_green:941607407027625994>・**${message.author.username},** You just collected \`💸 ${earning.toLocaleString()}\` daily rewards.`)
		.setTimestamp()
		message.reply({ embeds: [embed] });
	}
};