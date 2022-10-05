const prefixModel = require("../../../models/goodbye");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "leave-channel",
  description: "Change the goodbye channel per server!",
  aliases: ["lchannel", "goodbye"],
  category: "Setup",
  userPerms: ["MANAGE_CHANNELS"],
  botPerms: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    if (!args[0]) {
      return message.reply("_\`\`\`ascidoc\nUsage: y.leave-channel <#channel|off> !\`\`\`_");
    }
    if (message.mentions.channels.first()) {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.channel.send(
          `<:check_green:941607407027625994>・***Leave Channel set to ${message.mentions.channels.first()}.***`
        );

        let newData = new prefixModel({
          Bye: message.mentions.channels.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.channel.send(
          `<:check_green:941607407027625994>・***Leave Channel set to ${message.mentions.channels.first()}.***`
        );

        let newData = new prefixModel({
          Bye: message.mentions.channels.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.channel.send(`<:check_green:941607407027625994>・***Leave channel has been turned off!***`);
      } else if (!data2) {
        return message.channel.send(`<:cross_warning:941601429783740456>・***Leave channel isn't setup!***`);
      }
    }
  },
};
