const Discord = require('discord.js')
const {Status} = require("discord.js");

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,
    async execute() {
        main.getClient().user.presence.set({
            status: Status.Idle,
            activities: [{
                name: config.presence,
                type: Discord.ActivityType.Playing
            }]
        })
    }
}