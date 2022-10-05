const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'kick',
    category: "Moderation",
    description: 'Kick commands.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            const warning = new MessageEmbed()
            .setColor("RED")
            .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
            return message.reply({ embeds: [warning] });
        }
        const user = message.mentions.members.first();

        if (user) {
                user.kick().then(() => {
            const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`${message.mentions.members.first()} has been Kicked!`)
            .setTimestamp()
            return message.reply({ embeds: [embed] })
                })
        } else {
            message.reply('Cannot find that user!')
        }

    }
}