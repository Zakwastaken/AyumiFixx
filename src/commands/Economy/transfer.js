const economyUser = require('../../../models/economy');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const COOLDOWN = 1 * 24 * 60 * 60 * 1000;

const addMoney = async (userID, cash = 0) => {
	await economyUser.updateOne(
		{ userID },
		{ $set: { userID, 'cooldowns.TRANSFER': Date.now() + COOLDOWN }, $inc: { cash } },
		{ upsert: true }
	);
};

module.exports = {
	name: 'transfer',
	description: 'Transfer money to another discord user.',
	usage: '<user> <amount>',
	example: '@Xenfo#0001 400',
	category: 'Economy',
	aliases: ['give'],
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],
	execute: async (message, args, client, prefix) => {
		const member = await economyUser.findOne({ userID: message.author.id });
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) {
			const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`<:cross_warning:941601429783740456>・***You must mention someone!***`)
			return message.reply({ embeds: [embed] }).then((msg) => {
				let time = "5s";
				setTimeout(function () {
				  msg.delete();
				}, ms(time));
			  });
		}
		const deduct = Number(args[1]) || 0;
		await addMoney(message.author.id, -deduct);
		await addMoney(user.id, deduct);
		const embed1 = new MessageEmbed()
		.setColor("#34eb95")
		.setTimestamp()
		.setDescription(`<:check_green:941607407027625994>・**${message.author.username}** has successfully sended \`💸 ${deduct.toLocaleString()}\` to **${user.tag}** balance!`)
		return message.reply({ embeds: [embed1] });
	}
};