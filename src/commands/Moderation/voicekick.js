const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
module.exports = {
  name: "voicekick",
  category: "Moderation",
  description: 'Voicekick commands.',
  execute: async (message, args, client, prefix) => { 
    if(!message.member.permissions.has("KICK_MEMBERS")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    if (!message.mentions.members.first())
      return message.reply(
        `Please specify a member!`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.reply(`User is not in any \`voice\` channel!`);

    message.mentions.members.first().voice.disconnect();
    const embed = new MessageEmbed()
    .setColor("#34eb95")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`\`\`\`asciidoc\nUser has been kicked from voice channel!\`\`\``)
    .setTimestamp()
    return message.reply({ embeds: [embed] })
  }
};