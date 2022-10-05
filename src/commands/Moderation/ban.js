const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const ms = require("ms")

module.exports = {
    name: "ban",
    description: "Bans a member.",
    category: "Moderation",
    usage: ".ban",
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
        if (!args[0]) return message.reply("Please mention a member first!")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLocaleLowerCase())

        if (!member) return message.reply("The user you provided is not valid in this guild, try using \`User ID\` or \`User Name\` or try to mention the member!")

        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply("You cannot \`ban\` a member of your same level or higher!")

        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("I cannot \`ban\` a member of my same level or higher!")

        const row = new MessageActionRow().addComponents(

            new MessageButton()
                .setStyle('DANGER')
                .setCustomId("banyes")
                .setLabel("Yes"),

            new MessageButton()
                .setStyle("PRIMARY")
                .setCustomId("banno")
                .setLabel("No"),

        )

        let banAskEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription("**⚠ - Do you really want to \`Ban\` this member?**")

        let banEndEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription("\`\`\`Thanks for using Ayumi Chan to use this commands!\`\`\`")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason provided!"

        let banEmbed = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription(`${member} has successfully been \`Banned\` for : ${reason}`)

        let banEmbed2 = new MessageEmbed()
            .setColor("#34eb95")
            .setDescription(`Cancelled ban request!`)

        const banPage = await message.reply({ embeds: [banAskEmbed], components: [row] })

        const col = await banPage.createMessageComponentCollector({
            componentType: "BUTTON",
            time: ms('10s'),
        })

        col.on('collect', i => {

            if (i.user.id !== message.author.id) return

            if (i.customId === 'banyes') {

                member.ban({ reason })

                member.send(`You've been \`Banned\` from **${message.guild.name}** by ${message.author} for : ${reason}`)

                banPage.edit({ embeds: [banEmbed], components: [] })

            }

            else if (i.customId === 'banno') {

                banPage.edit({ embeds: [banEmbed2], components: [] })

            }

        })

        col.on('end', () => {

            banPage.edit({ embeds: [banEndEmbed], components: [] })

        })

    }

}