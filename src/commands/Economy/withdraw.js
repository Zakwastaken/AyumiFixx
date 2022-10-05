const economyUser = require('../../../models/economy');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const balance = require('./balance');
const ms = require('ms');

const addMoney = async (userID, num = 0) => {
	await economyUser.updateOne(
		{ userID },
		{ $set: { userID }, $inc: { balance: -num, cash: Number(num) } },
		{ upsert: true }
	);
};

module.exports = {
	name: 'withdraw',
	description: 'Withdraw money from your bank',
	usage: '<amount>',
	example: '10000',
	category: 'Economy',
	aliases: ['wd'],
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

	execute: async (message, args, client, prefix) => {
		const user = await economyUser.findOne({ userID: message.author.id });
		if (user && user.balance && user.balance > 0) {
			const num = typeof amount === 'number' && amount > 0 && amount <= user.balance
				? amount
				: user.balance;
			await addMoney(message.author.id, num);
			const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setTimestamp()
            .setDescription(`<:check_green:941607407027625994>・**${message.author.username}** has successfully withdrawn \`💸 ${num.toLocaleString()}\` from the bank! `)
			return message.reply({ embeds: [embed] })
		}
		const embed1 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`<:cross_warning:941601429783740456>・**${message.author.username},** You don't have any cash!`)
        message.reply({ embeds: [embed1] }).then((msg) => {
			let time = "5s";
			setTimeout(function () {
			  msg.delete();
			}, ms(time));
		  })
		}}