const discord = require("discord.js");
const { Random } = require("something-random-on-discord");

module.exports = {
  name: "cry",
  category: "Roleplay",
  description: "Cry with gif.",
  execute: async (message, args, client, prefix) => {
    
    let data = await Random.getAnimeImgURL("cry");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("#34eb95")
    .setTimestamp()
    
    await message.reply({ embeds: [embed] });
  }
};