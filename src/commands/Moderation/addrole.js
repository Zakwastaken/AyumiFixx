const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "addrole",
  aliases: ["role", "qrole"],
  category: "Moderation",
  description: "Add role to any user.",
execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("<:cross_warning:941601429783740456>・You don't have permission to use this commands!");
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply("<:cross_warning:941601429783740456>・I don't have permission to use this commands!");
        
        if (!args[0]) return message.reply("Please enter a role!")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.reply("Please specify a member!");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('Cannot add role to this user!')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.reply("Please enter a role!")

        if (!role) return message.reply("Could not find that role!")

        if (role.managed) return message.reply("Cannot add role to this user!")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('Role is currently higher than me therefore cannot add it to the user!')

        if (rMember.roles.cache.has(role.id)) return message.reply("User already has the role!")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        const embed = new MessageEmbed()
            .setColor("#34eb95")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`\`\`\`Role has been added to ${rMember.user.username}!\`\`\``)
            return message.reply({ embeds: [embed] })
    }
};