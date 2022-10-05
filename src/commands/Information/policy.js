const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require('../../config');

module.exports = {
    name: "policy",
    category: "Information",
    description: "Show privacy policy.",
    aliases: ["privacy"],

    execute: async (message, args, client, prefix) => {
        const urlbutt2 = new MessageButton().setLabel("Support Server.").setStyle("LINK").setURL("https://bit.ly/3IiX5wS")
        const row3 = new MessageActionRow().addComponents(urlbutt2)
        let dm = new MessageEmbed()
        .setDescription(`<:ayumi_info:943814952232288298>・Hey **${message.author.username},** Please check your DM for Privacy Policy!`)
        .setColor("#34eb95")
        message.reply({embeds: [dm]});

    let embed = new MessageEmbed()
    .setAuthor(`Ayumi Chan 은어 Privacy Policy`, client.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setDescription(`\`\`\`asciidoc\n> We do not store or share any kind of personal details of any server and user.\n> The snipe command only retrieves the text message, no images, and embed will be sniped.\n> We follow all the term of Service of both Discord, Youtube & IMDb.\n> In case you need to contact with us regarding the bot information and update.\n> Join our support server to get the support from us and also all the the workings of the bot is been posted on github too.\`\`\``)
    .setFooter("© Zakuro Development 2022")
    .setTimestamp()
    .setColor("#34eb95");
    return message.author.send({embeds: [embed], components: [row3]})
}}