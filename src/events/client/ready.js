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
        main.getClient().guilds.cache.forEach(guild => {
            guild.invites.fetch()
                .then(invites => {
                    const codeUses = new Map();
                    invites.each(inv => codeUses.set(inv.code, inv.uses));
                    main.getClient().guildInvites.set(guild.id, codeUses);
                })
                .catch(err => {
                    console.log("OnReady Error:", err)
                })
        })
    }
}