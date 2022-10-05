const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "slowmode",
    category: "Admin",
    description: "Slowmode channels.",
    usage: "<time>",
    execute: async (message, args, client, prefix) => {
      if(!message.member.permissions.has("MANAGE_CHANNELS")) {
        const warning = new MessageEmbed()
        .setColor("RED")
        .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
        return message.reply({ embeds: [warning] });
      }
      const amount = parseInt(args[0]);
        if (isNaN(amount))
          return message.reply("It doesn't seem to be valid number!");
      if (args[0] === amount + "s") {
        message.channel.setRateLimitPerUser(amount);
        if (amount > 1) {
          message.reply(`Slowmode is now **${amount}** seconds!`);
          return;
        } else {
          message.reply(`Slowmode is now **${amount}** second!`);
          return;
        }
      }
      if (args[0] === amount + "min") {
        message.channel.setRateLimitPerUser(amount * 60);
        if (amount > 1) {
          message.reply(`Slowmode is now **${amount}** minutes!`);
          return;
        } else {
          message.reply(`Slowmode is now **${amount}** minute!`);
  
          return;
        }
      }
      if (args[0] === amount + "h") {
        message.channel.setRateLimitPerUser(amount * 60 * 60);
        if (amount > 1) {
          message.reply(`Slowmode is now **${amount}** hours!`);
          return;
        } else {
          message.reply(`Slowmode is now **${amount}** hour!`);
          return;
        }
      } else {
        message.reply(
          "You can only set **seconds(s), minutes(min) and hours(h)!**"
        );
      }
    }
  };