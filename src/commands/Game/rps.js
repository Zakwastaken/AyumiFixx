const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js")

module.exports = {
    name: "rps",
    category:"Games",
    description: "Play the rps game!",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

     execute: async (message, args, client, prefix) => {
        const BotChoice = ["โ๏ธ", "๐ค", "โ"][Math.floor(Math.random() * ["โ๏ธ", "๐ค", "โ"].length)]

        const MessageEmb = new MessageEmbed().setDescription("Choose in the buttons `Scissors` `Stone` `Paper`.").setColor("GREEN")

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("โ๏ธ")
                .setCustomId("scissors"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("โฐ๏ธ")
                .setCustomId("stone"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("๐งป")
                .setCustomId("paper"),
        )

        const msg = await message.reply({ embeds: [MessageEmb], components: [row] })

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "BUTTON",
            time: 120000,
            max: 1
        })

        collector.on("collect", async (collected) => {

            if (collected.customId === "scissors") {
                let result

                switch(BotChoice) {
                    case "โ๏ธ":
                        result = "\`\`\`It is a tie!\`\`\`"
                        break;
                    case "๐ค":
                        result = "\`\`\`You lost!\`\`\`"
                        break
                    case "โ":
                        result = "\`\`\`You won!\`\`\`"
                }

                const emb = new MessageEmbed()
                .setColor("#34eb95")
                    .addField(message.author.username, "โ๏ธ", true)
                    .addField("VS", "โก", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "stone") {
                let result

                if (BotChoice === "โ๏ธ") result = "\`\`\`You have won!\`\`\`"
                if (BotChoice === "๐ค") result = "\`\`\`It is a tie!\`\`\`"
                if (BotChoice === "โ") result = "\`\`\`You have lost!\`\`\`"

                const emb = new MessageEmbed()
                .setColor("#34eb95")
                    .addField(message.author.username, "๐ค", true)
                    .addField("VS", "โก", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "paper") {
                let result

                    switch(BotChoice) {
                    case "โ๏ธ":
                        result = "\`\`\`It is a tie!\`\`\`"
                        break;
                    case "๐ค":
                        result = "\`\`\`You lost!\`\`\`"
                        break
                    case "โ":
                        result = "\`\`\`You have won!\`\`\`"
                }

                const emb = new MessageEmbed()
                .setColor("#34eb95")
                    .addField(message.author.username, "โ", true)
                    .addField("VS", "โก", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            collected.deferUpdate()
        })

    },
}
