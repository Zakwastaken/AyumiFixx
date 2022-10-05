const economyUser = require('../../../models/economy');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const OWNERID = "760723665372971008";

const addMoney = async (userID, balance = 0) => {
	await economyUser.updateOne({ userID }, { $set: { userID }, $inc: { balance: -balance } }, { upsert: true });
};

module.exports = {
	name: 'subbal',
	description: 'Remove money from someones account.',
	usage: '<user> <amount>',
	example: '@Xenfo#0001 10000',
	aliases: ['subtract-balance', 'sub'],
	category: 'Owner Only',

	execute: async (message, args, client, prefix) => {
        if (message.author.id != OWNERID) {
            let warning = new MessageEmbed()
            .setColor("RED")
            .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
            return message.reply({ embeds: [warning] });
          }
		const user = message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!user) return message.reply('You must mention someone!');

		const bal = Number(args[1]) || 0;
		await addMoney(user.id, bal);
        const embed = new MessageEmbed()
        .setColor("#34eb95")
        .setTimestamp()
        .setDescription(`<:check_green:941607407027625994>・Succesfully reset \`💸 ${bal.toLocaleString()}\` from **${user.tag}** balance!`)
		return message.reply({ embeds: [embed] });
	}
};