const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cuddle",
 aliases: [],
 description: "Give a cuddle to mentioned user",
 category: "Roleplay",
 usage: "cuddle <user>",
 execute: async (message, args, client, prefix) => {
    const member = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!member) return message.reply('<:cross_warning:941601429783740456>・***You must mention someone!***');
   try {
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(`**\`${member.username}\` has just been cuddled by \`${message.author.username}.\`**`)
     .setImage(body.url)
     .setColor("#34eb95")
     .setTimestamp()
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
 },
};