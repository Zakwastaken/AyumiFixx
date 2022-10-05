const Discord = require("discord.js")
const config = require("../../config")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["sn"],
  category: "Utility",
  usage: "(prefix)snipe",
  description: "Get deleted messages.",
  execute: async (message, args, client, prefix) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.reply("<:cross_warning:941601429783740456>・***There are no deleted messages in this channel!***")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.profilephoto)
    .setColor("#34eb95")
    .setTimestamp()
    .setDescription(msg.content)
    if(msg.image)embed.setImage(msg.image)
    
    message.reply({ embeds: [embed] });
   
    
  }
}