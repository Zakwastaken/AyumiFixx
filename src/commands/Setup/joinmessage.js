const prefixModel = require("../../../models/joinmsg");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "welcome-message",
  description: "Change the welcome message per server!",
  aliases: ["joinmsg", "welcomemsg", "jmsg"],
  category: "Setup",
  userPerms: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("MANAGE_GUILD")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    const text = args.join(" ");
    if (!args[0]) {
      return message.reply(`_\`\`\`asciidoc\nUsage: y.welcome-message <Text|off> !\`\`\`_`);
    }
    if (text !== "off") {
      const data = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });
        let newData = new prefixModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        message.channel.send(`<:check_green:941607407027625994>・**Join Message set to ${newData.JoinMsg}.**`);
      } else if (!data) {
        let newData = new prefixModel({
          JoinMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        message.channel.send(`<:check_green:941607407027625994>・**Join Message set to ${newData.JoinMsg}.**`);
      }
    } else if (text === "off") {
      const data2 = await prefixModel.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await prefixModel.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.channel.send(`<:check_green:941607407027625994>・***Join Message has been turned off!***`);
      } else if (!data2) {
        return message.channel.send(`<:cross_warning:941601429783740456>・***Join Message isn't setup!***`);
      }
    }
  },
};
