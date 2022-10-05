const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'membercount', //name of your command
    category: 'Information',
    description: 'Count the number of members & bot in this server.', //description of your command
    execute: async (message, args, client, prefix) => {
        const members = await message.guild.members.fetch()
        let embed = new MessageEmbed()
        .setTitle(`Total Members.`)
        .setDescription(`**${message.guild.name}** have total **${message.guild.memberCount} members.** `)
        .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
        .setColor("#34eb95")
        .setTimestamp()
        message.reply({ embeds: [embed] })
    }
}