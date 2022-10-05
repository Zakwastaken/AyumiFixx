const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "Moderation",
  description: "Remove role from any user.",
  execute: async (message, args, client, prefix) => {
    if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("<:cross_warning:941601429783740456>・You don't have permission to use this commands!");
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply("<:cross_warning:941601429783740456>・I don't have permission to use this commands!");
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`I am unable to find the user!`)
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.reply(`I am unable to find the role!`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("#34eb95")
      .setDescription(`\`\`\`Role has been removed from a user!\`\`\``)
      .setTimestamp()
      message.reply({ embeds: [embed] })

      
      target.roles.remove(rrole)
    
  }
}