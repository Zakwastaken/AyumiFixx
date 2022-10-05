const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "firstmessage",
  description: "Get the first message in a .",
  aliases: ["fm"],
  category: "Utility",
  execute: async (message, args, client, prefix) => {
    const fetchmessages = await message.channel.messages.fetch({ limit: 1, after: 1 })
    const msg = fetchmessages.first()

    const embed = new MessageEmbed()
      .setDescription(`**Message Content :** ${msg.content}\n**Sent By :** ${msg.author}\n**Date Sent :** <t:${parseInt(msg.createdTimestamp / 1000)}:R>\n**URL :** **[Click Here.](${msg.url})**`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor("#34eb95")
      .setTimestamp()
    message.reply({ embeds: [embed] })
  },
}
