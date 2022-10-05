const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "Moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules.",
  execute: async (message, args, client, prefix) => {
    
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const warning = new MessageEmbed()
      .setColor("RED")
      .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
      return message.reply({ embeds: [warning] });
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.reply("Please specify a member!")
    }
    
    if(message.mentions.users.first().bot) {
      return message.reply("You can't \`warn\` bots!")
    }
    
    if(message.author.id === user.id) {
      return message.reply("You can't \`warn\` yourself!")
    }
    
    if(user.id === message.guild.ownerId) {
      return message.reply("How you can warn server owner? -_-")
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.reply("Please provide reason to \`warn\`!")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.reply(`${message.mentions.users.first().username} already reached his/her limit with 3 \`warnings\`!`)
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}!`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}!`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}!`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}!`)
    }
    
  
  } 
}