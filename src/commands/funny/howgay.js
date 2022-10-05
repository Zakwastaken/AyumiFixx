const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config");
const lineReply = require('discord-reply')

module.exports = {
  name: "howgay",
  category: "Funny",
  aliases: [],
  description: "Show how Gay member is!",
  example: `${prefix}howgay <Mention Member>`,
  execute: async (message, args, client, prefix) => {
    //Start
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor("#34eb95")
      .setTitle(`gay v2 Machine`)
      .setDescription(`\`\`\`${Member.user.username} is ${Result}% Gay 🏳️‍🌈\`\`\``)
      .setTimestamp();

      message.reply({ embeds: [embed] });

    //End
  }
};