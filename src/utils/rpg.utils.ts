import rpg from '@schema/rpg.schema'

export const findUserRpg = async (id: string) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    let __data = await rpg.findOne({ id })
    if (!__data) __data = await rpg.create({ id })
    return __data
}

export const editRpg = async (id: string, edit: Object = null) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    if (edit == null) throw 'Enter what needs to be edited!'
    await rpg
        .findOneAndUpdate({ sender: id }, { $set: edit })
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e
        })
}
