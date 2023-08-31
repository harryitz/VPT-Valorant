const Discord = require("discord.js");


module.exports = {
    name: Discord.Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        if(member.partial) member = await member.fetch();
        if(member.user.bot) return;
        const cachedInvites = main.getClient().guildInvites.get(member.guild.id);
        const newInvites = await member.guild.invites.fetch();
        if(member.guild.vanityURLCode) newInvites.set(member.guild.vanityURLCode, await member.guild.fetchVanityData());
        main.getClient().guildInvites.set(member.guild.id, newInvites);
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses <= inv.uses);
        if(!usedInvite) return;
        let inviter = await member.guild.members.fetch(usedInvite.inviter);
        console.log(inviter.user);
    }
}