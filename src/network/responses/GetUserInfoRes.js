import { getUser } from "../../storage/UserStorage";
import { getUserInfo } from "../../utils/Auth";

export const name = 'GetUserInfoRes'

export const method = 'GET'

export const pathName = 'GET_INFO'

export const run = async (req, res) => {
    const { discordId } = req.params;

    if (!discordId) {
        return res.status(400).json({
            message: 'Bad request.',
            status: 400
        });
    }

    const user = await getUser(discordId);
    await refeshToken(discordId);

    const userInfo = await getUserInfo(user.auth.rso);
    
    if (!user || !userInfo) {
        return res.status(400).json({
            message: 'User not found.',
            status: 505
        });
    }

    return res.status(200).json({
        message: 'Success.',
        status: 200,
        data: {
            username: userInfo.username.split('#')[0],
            tag: userInfo.username.split('#')[1]
        }
    });
}