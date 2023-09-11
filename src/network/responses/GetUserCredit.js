export const name = 'GetUserCredit'

export const method = 'GET'

export const pathName = 'GET_USER_CREDIT'

export const run = async (req, res) => {
    const { discordId } = req.params;
    if (!discordId) {
        return res.status(400).json({
            message: 'Bad request.',
            status: 400
        });
    }
    let user = await main.getDatabase().getCredit(discordId);
    if (!user) {
        user = 0;
    }
    return res.status(200).json({
        message: 'Success.',
        status: 200,
        data: {
            credit: user
        }
    });
}