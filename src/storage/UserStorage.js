import { QuickDB } from "quick.db";
const db = new QuickDB({
    filePath: "./users.sqlite",
    table: "users",
})

export const addUser = (user) => {
    const existsUser = getUser(user.id);
    if (existsUser) {
        db.set(user.id, user)
        return;
    }
    db.add(user.id, user)
}

export const getUser = (id) => {
    return db.get(id);
}

export const isReadyLink = async (username) => {
    const users = await db.all();
    return new Promise((resolve, reject) => {
        users.forEach(user => {
            if (user.value.auth.login === username && user.value.auth.wait2FA !== true) {
                resolve(true);
            }
        })
        resolve(false);
    })
}

export const getUserbyPuuid = (id, puuid) => {
    return db.get(id).then(user => {
        if (!user) return null;
        if (user.puuid === puuid) {
            return user;
        } else {
            return null;
        }
    })
}

export const deleteUser = (id) => {
    db.delete(id)
}