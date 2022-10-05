const { MessageActionRow, MessageButton, MessageEmbed, Interaction, CommandInteraction } = require("discord.js");
const econoymSchema = require("../../../models/economy");
const config = require('../../../src/config');
const moment = require('moment');

module.exports = {
  name: "unregister",
  description: "Delete all your data from the economic system.",
  category: "economy",
  execute: async (message, args, client, prefix) => {
    const verify = "<:check_green:941607407027625994>";
    const cancel = "<:cross_warning:941601429783740456>";

    const econ = await econoymSchema.findOne({ userID: message.author.id })
    if (!econ) return message.reply({ content: `\`\`\`asciidoc\nYou are not registered to the economic system. ${prefix}register to register yourself` });
    
    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("verify")
          .setEmoji(verify)
          .setStyle("SUCCESS")
          .setLabel("Yes")
          .setDisabled(state),
        new MessageButton()
          .setCustomId("deny")
          .setEmoji(cancel)
          .setStyle("DANGER")
          .setLabel("No")
          .setDisabled(state)
      )
    ]
    const initialEmbed = new MessageEmbed()
    .setColor("RED")
      .setTitle("UNREGISTER")
      .setDescription(`Are you sure you want to Unregister yourself from the economy system?`)
      .addField("\u200b", `・Click ${verify} to unregister.\n・Click ${cancel} to cancel the unregistration.`)
    const initialMessage = await message.reply({
      embeds: [initialEmbed],
      components: components(false)
    })

    const filter = (i) => {
      if (i.user.id === message.author.id) return true
      else i.deferReply({ content: "This is not for you!", ephermal: true })
    }

    const collector = await initialMessage.createMessageComponentCollector({
      filter,
      componentType: "BUTTON",
      max: 1,
    })


    collector.on("collect", async (interaction) => {
      if (interaction.customId === "verify") {
        const editEmbed = new MessageEmbed()
          .setTitle("UNREGISTERED")
          .setDescription(`\`\`\`asciidoc\nYour data from the economy system has been deleted.\`\`\``)
          .setColor("GREEN")
       initialMessage.edit({ embeds: [editEmbed], components: components(true) })
        econ.delete()
      } else if (interaction.customId === "deny") {
        const editEmbed = new MessageEmbed()
          .setTitle("CANCELLED")
          .setDescription(`\`\`\`asciidoc\nYou cancelled your Unregistration from the economic system.\`\`\``)
          .setColor("RED")
      initialMessage.edit({ embeds: [editEmbed], components: components(true) })
      }
    })
  },
};