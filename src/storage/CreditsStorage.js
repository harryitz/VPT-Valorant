import SimplDB from "simpl.db";
const db = new SimplDB();
const inviter = db.createCollection('inviter')

export const getInviterDB = (userid) => {
    return inviter.get(user => {
        if (!user) return false;
        return user.id === userid
    });
}

export const addInviterDB = (userid, data) => {
    const user = getInviterDB(userid);
    if (user) {
        inviter.update(
            target => target.data = data,
            user => user.id === userid
        )
        return;
    }
    inviter.create({
        id: userid,
        data: data
    })
}

export const addRankToInviterDB = async (id, rank) => {
    const user = await getInviterDB(id);
    if (user) {
        user.data.claimedRank.push(rank);
        inviter.update(
            target => target.data = user.data,
            user => user.id === id,
        );
        return;
    }
    inviter.create({
        id: id,
        data: {
            inviterId: null,
            claimedRank: [rank]
        }
    })
}