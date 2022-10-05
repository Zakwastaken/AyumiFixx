const { Client, Message, MessageEmbed } = require('discord.js');
let ownerid = "760723665372971008";


module.exports = {
    name: 'leaveserver',
    aliases: ['lvs'],
    category: "Owner",
    description: 'bot can leave server by this command',
    useage: '',
    accessableby: "",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

     execute: async (message, args, client, prefix) => {
        if (message.author.id !== ownerid) {
                return message.reply({embeds: [ new MessageEmbed()
                        .setColor("RED")
                        .setDescription("<:cross_warning:941601429783740456>・Only **Zakuro** can use this commands!")
                    ]})
                }
        const guildId = args[0];

        if (!guildId) return message.reply({ embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription("\`\`\`Please Provide an Guild ID!\`\`\`")
            ]})
        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return message.reply({ embeds: [ new MessageEmbed()
                .setColor("GREEN")
                .setDescription("\`\`\`This Guild Not Found ...\`\`\`")
            ]})
        let leaved = await guild.leave()
        if (leaved) {
            return message.reply({embeds: [  new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`\`\`\`Successfully Left Guild: ${guild.name}\`\`\``)
                    ]})
        } else {
            message.reply({content: `i can't do that!`})
        }

    }
}