const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "deletechannel",
  category: "Admin",
  description: "Delete channels from your server.",
  userPerms: ["MANAGE_CHANNELS"],
  botPerms: ["EMBED_LINKS", "MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    const fetchedChannel = message.mentions.channels.first();
    if (!fetchedChannel) {
      return message.reply("`Usage: y.delchannel <channel>`");
    }
    fetchedChannel.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates!")
      .setDescription("\`\`\`Channel has been deleted!\`\`\`")
      .setColor("#34eb95");

    await message.reply({ embeds: [embed] });
  },
};