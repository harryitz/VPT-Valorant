module.exports = {
    data: new  Discord.SlashCommandBuilder()
        .setName('mm')
        .setDescription('VPT MM'),
    async execute(interaction) {
        await main.getDatabase().recreatePurchase();
        await interaction.reply({
            embeds: [embedMessage(`Đã fill lại các lượt mua!`)],
            ephemeral: true
        });
    }
}