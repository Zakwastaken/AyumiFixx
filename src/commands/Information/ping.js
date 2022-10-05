const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Check ping and latency bot.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
  await message.reply({ content: "Pinging ..." }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
    .setAuthor({ name: "Pong", iconURL: client.user.displayAvatarURL()})
    .setColor("#34eb95")
    .addField("Bot Latency", `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, true)
    .addField("API Latency", `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, true)
    .setTimestamp();

  await msg.edit({
    content: "\`🏓\`",
    embeds: [PingEmbed]
  })
 })
 }
}