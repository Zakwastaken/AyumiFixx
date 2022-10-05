const db = require("quick.db")
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resetwarns",
  category: "Moderation",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person.",
  execute: async (message, args, client, prefix) => {
    
    
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.reply("Please mention the person whose \`warning\` you want to reset!")
    }
    
    if(message.mentions.users.first().bot) {
      return message.reply("Bot are not allowed to have \`warnings\`!")
    }
    
    if(message.author.id === user.id) {
      return message.reply("You are not allowed to reset your \`warnings\`!")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.reply(`${message.mentions.users.first().username} do not have any \`warnings\`!`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Your all \`warnings\` are reseted by ${message.author.username} from ${message.guild.name}!`)
    await message.reply(`Reseted all \`warnings\` of ${message.mentions.users.first().username}!`)
    
  
    
}
}