const economyUser = require('../../../models/economy');
const { Permissions, MessageEmbed } = require('discord.js');
const ms = require('ms');

const addMoney = async (userID, num = 0) => {
	await economyUser.updateOne({ userID }, { $set: { userID }, $inc: { balance: Number(num), cash: -num } }, { upsert: true });
};

module.exports = {
	name: 'deposit',
	description: 'Deposit money into your bank.',
	usage: '<amount>',
	example: '500',
	category: 'Economy',
	aliases: ['dep all', 'dep'],
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],
	execute: async (message, args, client, prefix) => {
		const user = await economyUser.findOne({ userID: message.author.id });
		if (user && user.cash && user.cash > 0) {
			const num = typeof amount === 'number' && amount > 0 && amount <= user.cash
				? amount
				: user.cash;
			await addMoney(message.author.id, num);
            const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setTimestamp()
            .setDescription(`<:check_green:941607407027625994>・**${message.author.username}** has succesfully deposited \`💸 ${num.toLocaleString()}\` to bank account.`)
			return message.reply({ embeds: [embed] });
		}
        const embed1 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`<:cross_warning:941601429783740456>・**${message.author.username},** You don't have any cash!`)
        return message.reply({ embeds: [embed1] }).then((msg) => {
			let time = "5s";
			setTimeout(function () {
			  msg.delete();
			}, ms(time));
		  });
	}
};