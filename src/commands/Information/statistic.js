const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "status",
  category: "Information",
  description: "Shows bot's uptime.",
  usage: "uptime",

  execute: async (message, args, client, prefix) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    
    const embed = new MessageEmbed()
    .setDescription(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`)
    .setColor("#34eb95")
    return message.reply({ embeds: [embed]})
  }
  
};