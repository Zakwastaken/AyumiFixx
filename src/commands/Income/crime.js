const economyUser = require('../../../models/economy');
const { Client, Message, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const ms = require('ms');

const COOLDOWN = 60 * 60 * 1000

const randomNum = (max, min) => Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
const addMoney = async (userID, cash = 0) => {
	await economyUser.updateOne(
		{ userID },
		{ $set: { userID, 'cooldowns.CRIME': Date.now() + COOLDOWN }, $inc: { cash } },
		{ upsert: true }
	);
};

module.exports = {
	name: 'crime',
	description: 'Take the risk and commit a crime.',
	usage: '',
	example: '',
	category: 'Income',
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

	execute: async (message, args, client, prefix) => {
		const data = await economyUser.findOne({ userID: message.author.id });
		if (data?.cooldowns?.CRIME > Date.now()) {
            const warning = new MessageEmbed()
			.setColor("RED")
			.setDescription(`⏱️・No! **${message.author.username},** You must wait **${ms(data.cooldowns.CRIME - Date.now())}.**`)
			return message.reply({ embeds: [warning] }).then((msg) => {
				let time = "5s";
				setTimeout(function () {
				  msg.delete();
				}, ms(time));
            });
		}
		const win = randomNum(10, 1) > 4 ? false : true;
		const earning = win ? 300 : -500;
		await addMoney(message.author.id, earning);

		if (win) {
            const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription(`<:check_green:941607407027625994>・**${message.author.username},** You committed a crime and got \`💸 300\``)
            .setTimestamp()
           return message.reply({ embeds: [embed] });
		}
        const embed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`<:cross_warning:941601429783740456>・**${message.author.username},** You got caught and fined \`💸 -500\``)
        .setTimestamp()
       return message.reply({ embeds: [embed2] });
	}
};
        