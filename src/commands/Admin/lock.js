const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "lock",
  description: "Locks a channel.",
  category: "Admin",
  usage: "lock-channel <...reason>\nlock-channel <...time>",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    const [...reason] = args;
    const duration = reason[0] ? ms(reason[0]) : false;
    if (duration) reason.shift();
    const _reason = reason.join(" ") || "There is no definite reason.";

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false
    });
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates!")
      .setDescription(
        `\`\`\`🔒 Channel has been locked!\`\`\``)
      .setColor("#34eb95");
    await message.reply({ embeds: [embed] });
    
    if (duration && !isNaN(duration)) {
      setTimeout(async () => {
        message.channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: true
        });
        const embed2 = new Discord.MessageEmbed()
          .setTitle("Channel Updates!")
          .setDescription(`\`\`\`🔒 Channel has been relocked!\`\`\``)
          .setColor("#34eb95");
        await message.reply({ embeds: [embed2] });
      }, Number(duration));
    }
  }
};