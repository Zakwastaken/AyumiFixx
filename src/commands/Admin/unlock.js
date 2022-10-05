const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks a channel.",
  category: "Admin",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true
    });
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates!")
      .setDescription(`\`\`\`🔒 Channel has been relocked!\`\`\``)
      .setColor("#34eb95");
    await message.reply({ embeds: [embed] });
    message.delete();
  }
};