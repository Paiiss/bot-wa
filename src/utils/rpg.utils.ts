import rpg from '@schema/rpg.schema'

export const findUserRpg = async (id: string) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    let __data = await rpg.findOne({ id })
    if (!__data) __data = await rpg.create({ id })
    return __data
}
