const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const ms = require("ms")

module.exports = {
    name: "unban",
    description: "Unbans a member.",
    category: "Moderation",
    usage: ".unban",
    UserPerms: ["BAN_MEMBERS"],
    BotPerms: ["BAN_MEMBERS"],
    cooldown: 5,


    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            const warning = new MessageEmbed()
            .setColor("RED")
            .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
            return message.reply({ embeds: [warning] });
            }
        const id = args[0]

        if (!id) return message.reply("Please provide a user id first!")

        if (isNaN(id)) return message.reply("The User ID should be an \`Integer!\`")

        const bannedMembers = await message.guild.bans.fetch()

        if (!bannedMembers.find((user) => user.user.id === id)) return message.reply("The member is not banned!")

        const row = new MessageActionRow().addComponents(

            new MessageButton()
                .setStyle('DANGER')
                .setCustomId("unbanyes")
                .setLabel("Yes"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setCustomId("unbanno")
                .setLabel("No"),

        )

        let unbanAskEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription("**⚠ - Do you really want to \`Unban\` this member?**")

        let unbanEndEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription("\`\`\`Thanks for using Ayumi Chan to use this commands!\`\`\`")

        let unbanEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription(`\`${id}\` has successfully been \`Unbanned!\``)

        let unbanEmbed2 = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription(`Cancelled \`Unban\` request!`)

        const unbanPage = await message.reply({ embeds: [unbanAskEmbed], components: [row] })

        const col = await unbanPage.createMessageComponentCollector({
            componentType: "BUTTON",
            time: ms('10s'),
        })

        col.on('collect', i => {

            if (i.user.id !== message.author.id) return

            if (i.customId === 'unbanyes') {

                message.guild.members.unban(id)

                unbanPage.edit({ embeds: [unbanEmbed], components: [] })

            }

            else if (i.customId === 'unbanno') {

                unbanPage.edit({ embeds: [unbanEmbed2], components: [] })

            }

        })

        col.on('end', () => {

            unbanPage.edit({ embeds: [unbanEndEmbed], components: [] })

        })

    }

}