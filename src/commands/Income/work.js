const jobs = ['Miner', 'Fisherman', 'Builder', 'Hunter', 'Knight', 'Castle Maid', 'Castle Chef', 'Logger'];
const economyUser = require('../../../models/economy');
const { Client, Message, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const ms = require('ms');

const COOLDOWN = 1 * 60 * 1000;

const randomNum = (max, min) => Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
const addMoney = async (userID, cash = 0) => {
	await economyUser.updateOne(
		{ userID },
		{ $set: { userID, 'cooldowns.WORK': Date.now() + COOLDOWN }, $inc: { cash } },
		{ upsert: true }
	);
};

module.exports = {
	name: 'work',
	description: 'Work and make money',
	usage: '',
	example: '',
	category: 'Income',
	aliases: [],
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

    execute: async (message, args, client, prefix) => {
		const data = await economyUser.findOne({ userID: message.author.id });
		if (data?.cooldowns?.WORK > Date.now()) {
            const warning = new MessageEmbed()
			.setColor("RED")
			.setDescription(`⏱️・No! **${message.author.username},** You must wait **${ms(data.cooldowns.WORK - Date.now())}.**`)
			return message.reply({ embeds: [warning] }).then((msg) => {
				let time = "5s";
				setTimeout(function () {
				  msg.delete();
				}, ms(time));
			  });
		} 
		const earning = randomNum(800, 250);
		const job = jobs[randomNum(jobs.length)];
		await addMoney(message.author.id, earning);
        const embed = new MessageEmbed()
		.setColor("#34eb95")
		.setTimestamp()
		.setDescription(`<:check_green:941607407027625994>・**${message.author.username},** You worked as a **${job}** and earn \`💸 ${earning.toLocaleString()}\``);
        message.reply({ embeds: [embed] });
	}
};