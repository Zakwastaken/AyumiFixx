const economyUser = require('../../../models/economy');
const { Client, Message, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const config = require('../../../src/config');
const ms = require('ms');

const COOLDOWN = 60 * 5 * 1000;

const randomNum = (max, min) => Math.floor(Math.random() * (max - (min ? min : 0))) + (min ? min : 0);
const addMoney = async (userID, cash = 0) => {
	await economyUser.updateOne(
		{ userID },
		{
			$set: { userID, 'cooldowns.BEG': Date.now() + COOLDOWN },
			$inc: { cash }
		},
		{ upsert: true }
	);
};

module.exports = {
	name: 'beg',
	description: 'Beg for money.',
	usage: '',
	example: '',
	category: 'Income',
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

	execute: async (message, args, client, prefix) => {
		const user =
      message.mentions.users.first() ||
      client.users.cache.filter((user) => user.username).get(args[0]) ||
      client.users.cache.filter((user) => user.tag).get(args[0]) ||
      client.users.cache.filter((user) => user.id).get(args[0]) ||
      message.author;
		const data = await economyUser.findOne({ userID: message.author.id });
		if (!data && user.id === message.author.id) return message.reply({ content: `\`\`\`asciidoc\nYou are not yet registered to the economy system, ${prefix}register to register yourself.\`\`\``})
      if (!data) return message.reply({ content: `\`\`\`asciidoc\nThis user is not registered to the economy system, ${prefix}register\`\`\`` })
		if (data?.cooldowns?.BEG > Date.now()) {
            const warning = new MessageEmbed()
			.setColor("RED")
			.setDescription(`⏱️・No! **${message.author.username},** You must wait **${ms(data.cooldowns.BEG - Date.now())}.** `)
			return message.reply({ embeds: [warning] }).then((msg) => {
				let time = "5s";
				setTimeout(function () {
				  msg.delete();
				}, ms(time));
			  });
		}
		const earning = randomNum(100, 150);
		await addMoney(message.author.id, earning);
        const embed = new MessageEmbed()
		.setColor("#34eb95")
		.setDescription(`<:check_green:941607407027625994>・**${message.author.username},** you just receive free \`💸 ${earning}\` from beg. `)
		.setTimestamp()
		message.reply({ embeds: [embed] });
	}
};


