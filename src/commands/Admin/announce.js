const Discord = require("discord.js");

module.exports = {
  name: "announce",
  category: "Admin",
  description: "Make an announcemnet in your server.",
  userPerms: ["MANAGE_MESSAGES"],
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  execute: async (message, args, client, prefix) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    const anchannel = message.mentions.channels.first();
    if (!anchannel) {
      return message.reply("`Usage: y.announce <channel> <msg>`");
    }
    if (!args.slice(1).join(" ")) {
      return message.reply(
        "Please add some text to make an \`Announcement!\`"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setTitle(`New Server Announcement!`)
      .setDescription(args.slice(1).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("#34eb95")
      .setFooter(`Announcement by ${message.author.username}`);
    anchannel.send({ embeds: [embed] });

    let anembed = new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`**Announcement has been sent to ${anchannel}!**`)
      .setColor("#34eb95");

    message.reply({ embeds: [anembed] });
    message.delete();
  },
};