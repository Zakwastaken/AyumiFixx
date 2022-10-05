const { MessageEmbed } = require('discord.js')
const randomPuppy = require('random-puppy')

module.exports = {
    name: 'meme',
    category: "Funny",
    description: 'Sends a random meme from Reddit.',
    execute: async (message, args, client, prefix) => {
        const subReddits = ['dankmemes', 'meme', 'me_irl']
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)
        const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setTimestamp()
            message.reply({ embeds: [embed] });

    },
}