const economyUser = require('../../../models/economy');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const config = require('../../../src/config');
const ms = require('ms');

module.exports = {
	name: 'balance',
	description: 'This command allows you to check someones or your own balance for the economy system.',
	usage: '<mentionUser>',
	category: 'Economy',
	aliases: ['bal', 'bank', 'rank', 'balance', 'coins', 'points'],
	clientPermissions: [Permissions.FLAGS.USE_EXTERNAL_EMOJIS],
	userPermissions: [],

	execute: async (message, args, client, prefix) => {
		try {
			const user =
      message.mentions.users.first() ||
      client.users.cache.filter((user) => user.username).get(args[0]) ||
      client.users.cache.filter((user) => user.tag).get(args[0]) ||
      client.users.cache.filter((user) => user.id).get(args[0]) ||
      message.author;
      message.author;
	  const data = await economyUser.findOne({ userID: message.author.id });
	  if (!data && user.id === message.author.id) return message.reply({ content: `\`\`\`asciidoc\nYou are not yet registered to the economy system, ${prefix}register to register yourself.\`\`\``})
	  if (!data) return message.reply({ content: `\`\`\`asciidoc\nThis user is not registered to the economy system, ${prefix}register\`\`\`` })
		
			const member = message.guild.members.cache.get(args[0]?.match(/\d+/)?.[0] ?? message.author.id);
			economyUser.findOne({ userID: member.id }, (err, user) => {
				if (err) console.log(err);
				let money = 0;
				let cash = 0;
				if (user) {
					money = user.balance ? user.balance : 0;
					cash = user.cash ? user.cash : 0;
				}
				const intro = new MessageEmbed()
				.setColor("GREEN")
				.setDescription("⏱️・Please wait, your transaction is being processed ...")
				message.reply({embeds: [intro]}).then((msg) => {
					let time = "3s";
					setTimeout(function () {
					  msg.edit({
						content: "`This is the result!`",
						embeds: [embed]
					  });
					}, ms(time))
				  });
				const embed = new MessageEmbed()
					.setColor("#34eb95")
					.setTimestamp()
					.setDescription(
						`<:check_green:941607407027625994>・**${message.author.username},** this is **${member.user.tag}** current money balance!\n_\`\`\`asciidoc\n====================================\n› Total Cash : 💸 ${cash.toLocaleString()}\n› Total Deposit : 💸 ${money.toLocaleString()}\n› Balance : 💸 ${(cash + money).toLocaleString()}\n====================================\`\`\`_`
					);
			});
		} catch {
			return message.reply('You must mention a user or provide a valid ID!');
		}
			}
		}

		
	

