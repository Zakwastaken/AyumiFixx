const { prefix } = require("../../config.js");

module.exports = async (client) => {
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");
    let statuses = [`y.help・${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`,`Last Update at 24/02/2022`];
    setInterval(function() {
  	let status = statuses[Math.floor(Math.random()*statuses.length)];		
        client.user.setPresence({
            activities: [
                {
                    name: status,
                    type: "STREAMING",
                    url: "https://www.twitch.tv/ayumi"
                }
            ],
            status: "online"
        });
    }, 30000)
 }

