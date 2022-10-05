const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require('../../config');

module.exports = {
    name: "about",
    category: "Information",
    description: "Shows about me.",
    aliases: ["ab"],

    execute: async (message, args, client, prefix) => {
        const embed = new MessageEmbed()
        .setAuthor(`Ayumi Chan 은어`, client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setColor("#34eb95")
        .setFooter("© Zakuro Development 2022")
        .setTimestamp()
        .setDescription("**Ayumi Chan 은어** is a multifunctional bot with tons of commands that you can use. This bot is created since 16th December 2020. This bot have many rich commands such as Stable Music, Moderation, Logging, Reaction, and lots more!")
        .addField("Developer Structure", "\`[+]\` **Zakuro** (Creator & Developer)\n\`[+]\` **Marasov** (Hostline Provider & Developer)\n\`[+]\` **BayuDC** (Developer)\n\`[+]\` **Gifaldy Azka** (Developer)\n\`[+]\` **Vithaya** (Supporter)\n\`[+]\` **Arata Masaaki** (Supporter)")
        .addField("Server Supporter",'\`[+]\` **[Weeboo ID Community](https://discord.gg/8cgh2Awuff)**\n\`[+]\` **[Candy Lands あめ](https://discord.gg/Wna9Z7mbrR)**\n')
        .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
        return message.reply({ embeds: [embed] })
        }}