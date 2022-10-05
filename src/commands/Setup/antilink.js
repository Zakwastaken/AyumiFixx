const prefixModel = require("../../../models/antilink");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "antilink",
  category: "Setup",
  description: "Setup antilink per server.",
  userPerms: ["MANAGE_GUILD"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    if (!args[0]) {
      return message.reply(
        `_\`\`\`asciidoc\nUsage: ${message.client.prefix}antilink <on|off>!\`\`\`_`
      );
    }
    if (args[0] === "On" || args[0] === "on") {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.reply(`<:check_green:941607407027625994>・**Antilink is now active!**`);

        let newData = new prefixModel({
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.reply(`<:check_green:941607407027625994>・ ***Antilink is now active!***`);

        let newData = new prefixModel({
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off" || args[0] === "Off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.reply(`<:check_green:941607407027625994>・***Antilink has been turned off!***`);
      } else if (!data2) {
        return message.reply(`<:cross_warning:941601429783740456>・***Antilink isn't setup!***`);
      }
    }
  },
};