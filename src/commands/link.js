const Discord = require('discord.js')
const {embedMessage, getRankIcon} = require("../utils/Utils");
const {bold} = require("discord.js");
const fs = require("fs");
const {login, getUseInfo, login2FA} = require("../utils/Auth");
const {isReadyLink} = require("../storage/UserStorage");

/**
 * @param {Discord.Message} message
 * @type {{data: Discord.SlashCommandBuilder, execute(*): Promise<void>}}
 */
module.exports = {
    data: new  Discord.SlashCommandBuilder()
        .setName('lienket')
        .setDescription('Liên kết với tài khoản valorant')
        .addStringOption(option => option
            .setName("username")
            .setDescription("Username")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("password")
            .setDescription("Password")
            .setRequired(true)
        ),
    async execute(interaction) {
        const username = interaction.options.getString("username");
        const password = interaction.options.getString("password");
        const user = interaction.user;
        const channel = interaction.channel;
        await interaction.deferReply({
            ephemeral: true
        })
        const readyLink = await isReadyLink(username);
        if (readyLink) {
            await interaction.editReply({
                embeds: [embedMessage(`Tài khoản ${username} đã được liên kết!`)]
            });
            return;
        }
        const authInfo = await login(user.id, username, password);
        if (!authInfo.success) {
            await interaction.editReply({
                embeds: [embedMessage(`Đăng nhập thất bại!`)]
            });
            return;
        }
        if (authInfo.mfa) {
            const filter = m => m.author.id === user.id;
            const collector = channel.createMessageCollector({
                filter,
                time: 60000,
                max: 1
            });
            await interaction.editReply({
                embeds: [embedMessage(`Vui lòng nhập mã xác thực 2 lớp!`)]
            });
            collector.on('end', async collected => {
                if (collected.size === 0) {
                    await interaction.editReply({
                        embeds: [embedMessage(`Hết thời gian!`)]
                    });
                    return;
                }
                const mfaCode = collected.first().content;
                const authInfo = await login2FA(user.id, mfaCode);
                if (!authInfo.success) {
                    await interaction.editReply({
                        embeds: [embedMessage(`Đăng nhập thất bại!`)]
                    });
                } else {
                    await interaction.editReply({
                        embeds: [embedMessage(`Đăng nhập thành công!`)]
                    });
                }
            })
        } else {
            await interaction.editReply({
                embeds: [embedMessage(`Đăng nhập thành công!`)]
            });
        }
    }
}