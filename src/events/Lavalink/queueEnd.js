const delay = require("delay");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = async (client, player) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;
	let thing = new MessageEmbed()
		.setColor("#34eb95")
		.setDescription(`\`\`\`${emojiwarn}・Music queue is ended, please add more song!\`\`\``)
	channel.send({embeds: [thing] });
}