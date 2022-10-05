const { MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");
const fetch = require('node-fetch')
/**
* Put according to your handler
*/
module.exports = {
    name: "yt-together",
    aliases : ['ytt'],
    category: "Games",
    description: "yt-together commands.",
    execute: async (message, args, client, prefix) => {
const channel = message.member.voice.channel;
const embed = new MessageEmbed()
 .setDescription("> **You must be connected to a voice channel to use this command.**")
 .setColor("#34eb95")
 const embedembed = new MessageEmbed()
.setDescription("**I was unable to start a yt-together session.**")
.setColor("#34eb95")
if (!channel) return message.reply({embeds: [embed]})
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.reply({embeds: [embedembed]})
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("YouTube.")
                        .setStyle("LINK")
                        .setURL(`https://discord.com/invite/${invite.code}`),
                );
            const inviteembed = new MessageEmbed()
                .setDescription("> **Click on the button to start playing YouTube!**")
                .setColor("#34eb95")
            message.reply({ embeds: [inviteembed], components: [row] })
        })
    }
}