const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person.",
  category: "Moderation",
  execute: async (message, args, client, prefix) => {
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.reply(`${user} have **${warnings}** warning(s)!`)
  
  
  }
}