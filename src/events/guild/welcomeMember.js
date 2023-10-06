const Discord = require("discord.js");
const {embedMessage} = require("../../utils/Utils");
const { Swiftcord } = require("swiftcord");
const cord = new Swiftcord();

module.exports = {
    name: Discord.Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        if(member.partial) member = await member.fetch();
        if(member.user.bot) return;
        const credits = await main.getDatabase().getCredit(member.id);
        if (credits) return; // Detect user has join before
        await main.getDatabase().addCredit(member.id, 1, false, `Tạo profile lần đầu!`);
        let image = await cord.Welcome()
            .setUsername(member.user.username)
            .setDiscriminator('0000')
            .setMemberCount(member.guild.memberCount.toLocaleString())
            .setGuildName(member.guild.name)
            .setGuildIcon(member.guild.iconURL({ extension: "png" }))
            .setAvatar(member.user.displayAvatarURL({ extension: "png", size: 2048 }))
            .setBackground("https://free.vector6.com/wp-content/uploads/2020/05/Hoa-Dao-Vector-0013.jpg")
            .toAttachment();
        const attachment = new Discord.AttachmentBuilder(image, {
            name: "welcome.png"
        })
        const welcomeChannel = await main.getClient().channels.fetch(config.welcomeChannel);
        welcomeChannel.send({
            content: 'Welcome to our community!',
            files: [attachment]
        });
        main.getClient().queues.push({
            id: member.id,
            users: []
        });
    }
}