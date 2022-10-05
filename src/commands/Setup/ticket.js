const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');

module.exports = {
    name: 'setticket',
    category: "Setup",
    description: 'Set ticket system.',
    /** 
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
        const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**How to make a ticket?**__\n" +


                "> Click on the reaction that relates to your need.\n" +

                "> Once the ticket is made you will be able to type in there."

            )
            .setTitle('Ticket Panel!')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Create Ticket!')
                .setStyle('PRIMARY'),
            );

        message.channel.send({
            embeds: [embed],
            components: [bt]
        });
    }
}