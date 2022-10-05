const Discord = require("discord.js");
const { Color, Prefix } = require("../../config");
const { MessageEmbed } = require("discord.js")
const schema = require('../../../models/schema');
const { set } = require("lodash");

module.exports = {
	name: "afk",
	aliases: [],
	category: "Utility",
    description: 'Away from keyboard.',
	example: `${Prefix}afk <reason>`,
	description: "",
    execute: async (message, args, client, prefix) => {
		let data;
    try {
        data = await schema.findOne({
            userId: message.author.id,
            guildId: message.guild.id,
        })
        if(!data) {
            data = await schema.create({
                userId: message.author.id,
                guildId: message.guild.id,
            })
        }
    } catch(e) {
        console.log(e)
    }

		let Member =
      message.guild.members.cache.get(args[0]) ||
      message.member;

		await Member.setNickname(`[AFK] ${Member.user.username}`).catch(err => {
			Member.send(`I can't change your \`nickname\` because your permissions is higher than me, or i dont have **CHANGE_NICKNAMES** permission to change it!`)
		});
    data.AFK = true
    data.AFK_Reason = args.join(" ")
    await data.save()
    const embed = new MessageEmbed()
    .setColor("#34eb95")
    .setDescription(`<:check_green:941607407027625994>・Succesfully setted your **AFK** for reason ${data.AFK_Reason}.`)
		message.reply({ embeds: [embed] });
	}
}