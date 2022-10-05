const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  description: "Invite Ayumi Today!",
  emoji: "➕",
  userperm: ["SEND_MESSAGES"],
  botperm: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   execute: async (message, args, client, prefix) => {
    const urlbutt = new MessageButton().setLabel("Invite Now!").setStyle("LINK").setURL("https://discord.com/oauth2/authorize?client_id=788610042193772625&scope=bot&permissions=564787677119")
    const row2 = new MessageActionRow().addComponents(urlbutt)
    const urlbutt2 = new MessageButton().setLabel("Support Server.").setStyle("LINK").setURL("https://bit.ly/3IiX5wS")
    const row3 = new MessageActionRow().addComponents(urlbutt2)
    const embed = new MessageEmbed()
      .setColor("#34eb95")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setTitle("Support Now!")
      .setImage("https://cdn.discordapp.com/attachments/933327921899262013/939040869829443624/IMG_20220204_131025.jpg")
      .setDescription(
        `Support me by pressing the button below 👇`
      )
      .setTimestamp()
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.reply({ embeds: [embed], components: [row2, row3] });
  },
};