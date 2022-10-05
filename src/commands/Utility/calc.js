const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
    name: 'calculator',
    category: "Utility",
    description: "Solve your maths homework.",
    usage: "[prefix]calculator [question]",
    aliases: ['calc', 'calculator'],
    execute: async (message, args, client, prefix) => {

        if(!args[0]) {
            const calculatorError = new MessageEmbed()
            .setDescription(`\`\`\`Please specify a question!\`\`\``)
            .setColor("#34eb95")
            return message.reply({ embeds: [calculatorError] })

        }

        let result;

        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"))
        } catch (error) {
            return message.channel.send(`Invalid Calculation!`)
        }

        const embed = new MessageEmbed()
        .setAuthor(`Calculator!`, client.user.displayAvatarURL())
        .addField(`Question`, `\`\`\`js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
        .addField(`Answer`, `\`\`\`js\n${result}\`\`\``)
        .setColor("#34eb95")
        return message.reply({ embeds: [embed] })
    }
}