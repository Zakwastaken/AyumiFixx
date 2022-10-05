const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 aliases: [],
 description: "BAKA!!!",
 category: "Roleplay",
 usage: "baka",
 execute: async (message, args, client, prefix) => {
  (async () => {
    const member = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!member) return message.reply('<:cross_warning:941601429783740456>・***You must mention someone!***');
   try {
    const response = await fetch("https://nekos.life/api/v2/img/baka");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `\`${message.author.username},\` you're baka \`${member.username}.\``,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("#34eb95")
     .setTimestamp()
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};