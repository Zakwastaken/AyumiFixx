const economyUser = require('../../../models/economy');
const { MessageEmbed } = require('discord.js');
const OWNERID = "760723665372971008";

const addMoney = async (userID, balance = 0) => {
	await economyUser.updateOne({ userID }, { $set: { userID }, $inc: { balance } }, { upsert: true });
};

module.exports = {
	name: 'addbal',
	description: 'Add money to a user, a bot administrator only commands.',
	usage: '<mentionUser> <amount>',
	example: '@Komi#0001 10000',
	aliases: ['add-balance', 'addbalance', 'add'],
	category: 'Owner Only',
	ownerOnly: true,

	execute: async (message, args, client, prefix) => {
        if (message.author.id != OWNERID) {
            let warning = new MessageEmbed()
            .setColor("RED")
            .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
            return message.reply({ embeds: [warning] });
          }
		const member = message.mentions.users.first() || client.users.cache.get(args[0]);
		if (!member) return message.reply('You must mention someone!');

		const bal = Number(args[1]) || 0;
		await addMoney(member.id, bal);
        const embed = new MessageEmbed()
        .setColor("#34eb95")
        .setTimestamp()
        .setDescription(`<:check_green:941607407027625994>・**${message.author.username}** has successfully sended \`💸 ${bal.toLocaleString()}\` to **${member.username}** balance!`)
		return message.reply({ embeds: [embed] });
	}
};