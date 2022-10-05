const discord = require("discord.js");
const { Random } = require("something-random-on-discord");


module.exports = {
  name: "punch",
  category: "Roleplay",
  description: "Punch someone!",
  execute: async (message, args, client, prefix) => {
    
    let target = message.mentions.members.first()
    
    let data = await Random.getAnimeImgURL("punch");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("#34eb95")
    .setDescription(`${message.author.username} \`punches\` ${message.mentions.users.first() || message.mentions.members.first()}!`)
    .setTimestamp()
    
    await message.reply({ embeds: [embed] })
  }
};