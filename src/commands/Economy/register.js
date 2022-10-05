const econoymSchema = require("../../../models/economy");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');


module.exports = {
  name: "register",
  description: "Register yourself in the economy system.",
  execute: async (message, args, client, prefix) => {
    econoymSchema.findOne({ userID: message.author.id }, async (err, data) => {
      if (data) return message.reply({ content: `\`\`\`asciidoc\nYou are already registered to the economic system since ${moment((Date.now() * 1000) / 1000).fromNow()}\`\`\`` })
      else {
        new econoymSchema({
          userID: message.author.id,
          createdAt: (Date.now() * 1000) / 1000,
          cash: + 5000
        }).save()
        const registered = new MessageEmbed()
        .setAuthor(`REGISTERED`, client.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setDescription(`<:check_green:941607407027625994>・**${message.author.username},** You have been registered to the Economy System at \`${moment((Date.now() * 1000) / 1000).fromNow()}\` and earn free \`💸 5,000\``)
          .setColor("GREEN")
          .setTimestamp()
        message.reply({ embeds: [registered] })
      }
    })
  }
}