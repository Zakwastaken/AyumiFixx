const Discord = require("discord.js");
const os = require('os');
const cpuStat = require("cpu-stat");
const package = require('../../../package.json');
const ms = require("ms");
const { stripIndent } = require('common-tags');

module.exports = {
    name: "botinfo",
    aliases: ["botinfo"],
    category: "Information",
    description: "Shows some bot statistics.",
    usage: "botinfo\n**e.g.**\n> \`botinfo\`\n> It will show you some cool satistics, such cpu/ram usage, number of servers/users, etc...",
    execute: async (message, args, client, prefix) => {
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
              return console.log(err);
            }
        
        const counters = stripIndent`
            Commands  :: ${client.commands.size}
            Guilds    :: ${Math.ceil(client.guilds.cache.size)}
            Users     :: ${client.guilds.cache.reduce((a, g) => a + (g.memberCount || 0) - 1, 0).toLocaleString()}
            Channels  :: ${client.channels.cache.size.toLocaleString()}
        `;
            
        const versions = stripIndent`
            Bot        :: ${package.version}
            Discord.js :: ${package.dependencies["discord.js"]}
            Node.js    :: ${process.version}
        `;

        const system = stripIndent`
            CPU       :: ${os.cpus().map(i => `${i.model.replace(/cpu|apu|\(tm\)|\(r\)|core|with|radeon|hd|graphics/gi, "")}`)[0]}
            Cores     :: ${cpuStat.totalCores()}
            CPU Usage :: ${percent.toFixed(2)} %
            RAM Usage :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem()/1024/1024).toLocaleString()} MB
            OS        :: ${os.platform()} ${os.release} ${os.arch()}
            Uptime    :: ${ms(os.uptime()*1000)}
        `;

            const embed = new Discord.MessageEmbed()
                .setAuthor(`Ayumi Chan 은어`, client.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setColor("#34eb95")
                .addField('Bot Created', `\`\`\`${client.user.createdAt.toLocaleString()}\`\`\``, false)
                .addField('Counters', `\`\`\`asciidoc\n${counters}\`\`\``, true)
                .addField('Versions', `\`\`\`asciidoc\n${versions}\`\`\``, true)
                .addField('System', `\`\`\`asciidoc\n${system}\`\`\``, false)
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL())

                message.reply({ embeds: [embed] });
        })
    }
}