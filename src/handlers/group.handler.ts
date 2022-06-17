import { WASocket } from '@adiwajshing/baileys'
import { checkData, getData, deleteData } from '@utils/setting/group.setting'
import { footer, link_group } from '@config'

/**
 * @param {import("@adiwajshing/baileys/src").AnyWAclientet} client
 * @description copied from https://github.com/FaizBastomi/wbot/blob/multi-device/event/group_event.js
 */

export class GroupHandler {
    async joinhandler(data, client: WASocket) {
        const gM = data.action === 'add' ? await client.groupMetadata(data.id) : null
        const myID = client.user.id.split(':')[0] + '@s.whatsapp.net' || client.user.id
        if (data.action === 'add' && data.participants.includes(myID)) {
            if (gM.participants.length < 3) {
                await client
                    .sendMessage(data.id, {
                        text: 'Sorry, but this group member is not more than 3 members, I leave soon.',
                    })
                    .then(async (m) => {
                        await client.groupLeave(data.id)
                        // setTimeout(async () => {
                        //     await client.chatModify({ delete: true }, data.id)
                        // }, 5000)
                    })
            } else {
                await client.sendMessage(data.id, { text: 'Thanks for letting me join your group :D' })
            }
        } else if (data.action === 'remove' && data.participants.includes(myID)) {
            let info = checkData(data.id.split('@')[0])
            if (info !== 'no_file') {
                deleteData(data.id.split('@')[0])
            }
        }

        // For User
        if (data.action === 'add' && !data.participants.includes(myID)) {
            let id = data.id.split('@')[0]
            let info = checkData(id)
            let replace = {
                '%': '%',
                member:
                    data.participants.length > 0
                        ? data.participants
                              .map((v) => {
                                  return '@' + v.split('@')[0]
                              })
                              .join(' ')
                        : '@' + data.participants[0].split('@')[0],
                user:
                    data.participants.length > 0
                        ? data.participants
                              .map((v) => {
                                  return '@' + v.split('@')[0]
                              })
                              .join(' ')
                        : '@' + data.participants[0].split('@')[0],
                group: gM?.subject,
                desc: gM?.desc?.toString(),
            }
            if (info !== 'no_file') {
                const dataConf = getData(id)
                let text = dataConf['join']['msg'].replace(
                    new RegExp(
                        `%(${Object.keys(replace)
                            .sort((a, b) => b.length - a.length)
                            .join(`|`)})`,
                        'g'
                    ),
                    (_, name) => '' + replace[name]
                )
                if (dataConf['join']['active']) {
                    await client.sendMessage(data.id, {
                        text,
                        mentions: data.participants,
                        templateButtons: [
                            { index: 1, urlButton: { displayText: 'Join', url: link_group } },
                            { index: 2, quickReplyButton: { displayText: 'Start viewing the menu', id: '.help' } },
                        ],
                        footer,
                    })
                }
            }
        } else if (data.action === 'remove' && !data.participants.includes(myID)) {
            let id = data.id.split('@')[0]
            let info = checkData(id)
            let replace = {
                '%': '%',
                member:
                    data.participants.length > 0
                        ? data.participants
                              .map((v) => {
                                  return '@' + v.split('@')[0]
                              })
                              .join(' ')
                        : '@' + data.participants[0].split('@')[0],
                user:
                    data.participants.length > 0
                        ? data.participants
                              .map((v) => {
                                  return '@' + v.split('@')[0]
                              })
                              .join(' ')
                        : '@' + data.participants[0].split('@')[0],
                group: gM?.subject,
                desc: gM?.desc?.toString(),
            }
            if (info !== 'no_file') {
                const dataConf = getData(id)
                let text = dataConf['left']['msg'].replace(
                    new RegExp(
                        `%(${Object.keys(replace)
                            .sort((a, b) => b.length - a.length)
                            .join(`|`)})`,
                        'g'
                    ),
                    (_, name) => '' + replace[name]
                )
                if (dataConf['left']['active']) {
                    await client.sendMessage(data.id, { text, mentions: data.participants })
                }
            }
        }
    }
}
