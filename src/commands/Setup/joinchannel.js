const prefixModel = require("../../../models/welcome");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "welcome-channel",
  description: "Change the welcome channel per server!",
  aliases: ["jchannel", "welcome"],
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
      return message.reply(`_\`\`\`asciidoc\nUsage: y.welcome-channel <#channel|off> !\`\`\`_`);
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
          `<:check_green:941607407027625994>・***Join Channel set to ${message.mentions.channels.first()}.***`
        );

        let newData = new prefixModel({
          Welcome: message.mentions.channels.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.channel.send(
          `<:check_green:941607407027625994>・**Join Channel set to ${message.mentions.channels.first()}.***`
        );

        let newData = new prefixModel({
          Welcome: message.mentions.channels.first().id,
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

        return message.channel.send(`<:check_green:941607407027625994>・***Join channel has been turned off!***`);
      } else if (!data2) {
        return message.channel.send(`<:cross_warning:941601429783740456>・***Join channel isn't setup!***`);
      }
    }
  },
};
