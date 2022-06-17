import { rpgMongo } from '@schema'

export const findUserRpg = async (user_id: string) => {
    if (!/@s.whatsapp.net/.test(user_id)) throw 'Invalid id/sender'
    let __data = await rpgMongo.findOne({ user_id })
    if (!__data) __data = await rpgMongo.create({ user_id })
    return __data
}

export const editRpg = async (user_id: string, edit: Object = null) => {
    if (!/@s.whatsapp.net/.test(user_id)) throw 'Invalid id/sender'
    if (edit == null) throw 'Enter what needs to be edited!'
    await rpgMongo
        .findOneAndUpdate({ user_id }, { $set: edit })
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e
        })
}

export const destroyedItem = async (user_id: string, item: 'sword' | 'armor' | 'pickaxe' | 'fishingrod') => {
    if (!/@s.whatsapp.net/.test(user_id)) throw 'Invalid id/sender'
    let { rpg }: any = await findUserRpg(user_id)
    if (rpg[item] == 0 || rpg[item] == false) throw `Player doesn't have a ${item}`
    let __typeItem = item === 'fishingrod' ? false : 0
    rpg[item] = __typeItem
    rpg[item + 'durability'] = 0
    return rpgMongo.findOneAndUpdate({ user_id }, { $set: { rpg } })
}
