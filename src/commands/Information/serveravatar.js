const Discord = module.require("discord.js");

module.exports = {
  name: "servericon",
  category: "Information",
  description: "Displays the server icon.",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  execute: async (message, args, client, prefix) => {
    const server = message.guild;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}'s Icon`)
      .setDescription(
        `[Icon Link](${server.iconURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(server.iconURL({ size: 2048, dynamic: true, format: "png" }))
      .setColor("#34eb95");
    message.reply({ embeds: [embed] });
    message.delete();
  },
};