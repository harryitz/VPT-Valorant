import { getUser } from "../../storage/UserStorage";
import { refeshToken } from "../../utils/Auth";

export const name = 'GetUserRegion'

export const method = 'GET'

export const pathName = 'GET_REGION'

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

    if (!user) {
        return res.status(400).json({
            message: 'User not found.',
            status: 505
        });
    }
    
    return res.status(200).json({
        message: 'Success.',
        status: 200,
        data: {
            region: user.region
        }
    });
}