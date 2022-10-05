const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clear",
    category: "Moderation",
    description: 'Clear commands.',
    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        const warning = new MessageEmbed()
        .setColor("RED")
        .setDescription("<:cross_warning:941601429783740456>・You don't have permission to use this commands!")
        return message.reply({ embeds: [warning] });
        }
        if (!args[0]) {
            return message.reply(`Please enter a amount 1 to 100!`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setDescription(`Successfully deleted **${deleteAmount}** messages!`)
            .setColor("#34eb95")
          await  message.channel.send({ embeds: [embed] });
    }
}