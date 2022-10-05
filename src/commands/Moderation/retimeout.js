const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "remove-timeout",
    aliases: ['uto'],
    category: "Moderation",
    description: "Untimeout a member from the server!",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     execute: async (message, args, client, prefix) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) {
          const warning = new MessageEmbed()
          .setColor("RED")
          .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
          return message.reply({ embeds: [warning] });
          }      
        try{
        const aut = message.author;
        const user = message.mentions.members.first()
        if(!user) return message.reply("Specify a user!")
        const reason = args.slice(2).join(" ") || "No reason provided."
        const member = message.guild.members.cache.get(user.id)
        
        await member.timeout(null)
     
        const embed = new MessageEmbed()
        .setDescription(`<:check_green:941607407027625994>・Removed timeout from **${user}** because **${reason}**`)
        .setColor("#34eb95")
        .setTimestamp()
        message.reply({ embeds: [embed]})
    } catch(e) {
         message.reply({ content: `${e}`})   
         return console.log(e)
    }
} 
}