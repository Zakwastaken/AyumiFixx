const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "createchannel",
  category: "Admin",
  description: "Create text channels in your server.",
  userPerms: ["MANAGE_CHANNELS"],
  botPerms: ["EMBED_LINKS", "MANAGE_CHANNELS"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    if (!args[0]) {
      return message.reply("Please mention the name for the \`Channel\`!");
    }
    message.guild.channels.create(args.slice(0).join(" "), { type: "text" });

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates!")
      .setDescription(`Channel has been created!`)
      .setColor("#34eb95");
    message.reply({ embeds: [embed] });
  },
};