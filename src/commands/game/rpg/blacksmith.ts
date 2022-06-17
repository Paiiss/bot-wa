import { ICommand } from '@constants'
import { editRpg, findUserRpg } from '@utils/rpg.utils'
import { footer } from '@config'

export default {
    description: 'blacksmith where weapons are made',
    category: 'game/rpg',
    aliases: ['createsword', 'createpickaxe', 'createarmor', 'createfishingrod'],

    callback: async ({ msg, client, command, args, prefix }) => {
        const { sender, from } = msg
        if (command === 'blacksmith') {
            let __Objk = Object.keys(blacksmith)
            let __Arr = []
            for (const v of __Objk) {
                let list = Object.fromEntries(Object.entries(blacksmith[v]))
                let __list = Object.keys(list)
                let a = []
                for (let abc of __list) {
                    let material = 'material: '
                    for (let __c in blacksmith[v][abc].material) {
                        material += blacksmith[v][abc].material[__c] + __c + ' '
                    }
                    a.push({ title: `${abc}`, rowId: prefix + v + ` ${abc}`, description: material })
                }

                __Arr.push({
                    title: v.toLowerCase(),
                    rows: a,
                })
            }
            return client.sendMessage(from, {
                title: `*––––『 BLACKSMITHS 』––––*`,
                text: '👴🏽⛏️ : Hello, welcome to blacksmith?, see the list below what I can make!',
                footer,
                buttonText: '~',
                sections: __Arr,
            })
        }
        const { rpg } = await findUserRpg(sender)
        let __type = (command == 'createsword' && 'sword') || (command == 'createarmor' && 'armor') || (command == 'createpickaxe' && 'pickaxe') || (command == 'createfishingrod' && 'fishingrod')
        if (rpg[__type] !== 0 && __type !== 'fishingrod') return msg.reply(`👴🏽⛏️ : I see you still have ${__type}, come when your ${__type} is destroyed`)
        else if (__type === 'fishingrod' && rpg[__type] == true) return msg.reply(`👴🏽⛏️ : I see you still have ${__type}, come when your ${__type} is destroyed`)

        const listItems = Object.fromEntries(Object.entries(blacksmith[command.toLowerCase()]))
        let type = (args[0] || '').toLowerCase()
        if (!(type in listItems)) {
            let __ar = [
                {
                    title: command.toUpperCase(),
                    rows: [],
                },
            ]
            let __obj = Object.keys(listItems)
            for (let i = 0; i < __obj.length; i++) {
                __ar[0].rows.push({ title: __obj[i], rowId: prefix + command + ` ${__obj[i]}` })
            }
            return client.sendMessage(from, {
                title: `*––––『 BLACKSMITHS 』––––*`,
                text: '!',
                footer,
                sections: __ar,
            })
        }

        for (const less in blacksmith[command][type].material) {
            if (rpg[less] < blacksmith[command][type].material[less]) return msg.reply(`you are short of ${less}`, true)
            rpg[less] -= blacksmith[command][type].material[less] * 1
        }
        ;(rpg[__type] = blacksmith[command][type].id), (rpg[__type + 'durability'] = blacksmith[command][type].durability)
        await editRpg(sender, { rpg })
        return msg.reply(`👴🏽⛏️ : Looks like I managed to make your ${__type}`)
    },
} as ICommand

const blacksmith = {
    createsword: {
        wooden: {
            id: 1,
            material: {
                wood: 10,
                string: 4,
            },
            durability: 60,
        },
        stone: {
            id: 2,
            material: {
                wood: 5,
                rock: 7,
                string: 4,
            },
            durability: 90,
        },
        iron: {
            id: 3,
            material: {
                wood: 5,
                iron: 7,
                string: 4,
            },
            durability: 125,
        },
        gold: {
            id: 4,
            material: {
                wood: 5,
                string: 4,
                gold: 7,
            },
            durability: 150,
        },
        diamond: {
            id: 6,
            material: {
                wood: 5,
                string: 4,
                diamond: 7,
            },
            durability: 200,
        },
        emerald: {
            id: 7,
            material: {
                wood: 5,
                string: 4,
                emerald: 7,
            },
            durability: 175,
        },
    },
    createarmor: {
        wooden: {
            id: 1,
            material: {
                wood: 10,
                string: 4,
            },
            durability: 60,
        },
        stone: {
            id: 2,
            material: {
                wood: 5,
                rock: 7,
                string: 4,
            },
            durability: 90,
        },
        iron: {
            id: 3,
            material: {
                wood: 5,
                iron: 7,
                string: 4,
            },
            durability: 125,
        },
        gold: {
            id: 4,
            material: {
                wood: 5,
                string: 4,
                gold: 7,
            },
            durability: 150,
        },
        diamond: {
            id: 6,
            material: {
                wood: 5,
                string: 4,
                diamond: 7,
            },
            durability: 200,
        },
        emerald: {
            id: 7,
            material: {
                wood: 5,
                string: 4,
                emerald: 7,
            },
            durability: 175,
        },
    },
    createpickaxe: {
        wooden: {
            id: 1,
            material: {
                wood: 10,
                string: 4,
            },
            durability: 60,
        },
        stone: {
            id: 2,
            material: {
                wood: 5,
                rock: 7,
                string: 4,
            },
            durability: 90,
        },
        iron: {
            id: 3,
            material: {
                wood: 5,
                iron: 7,
                string: 4,
            },
            durability: 125,
        },
        gold: {
            id: 4,
            material: {
                wood: 5,
                string: 4,
                gold: 7,
            },
            durability: 150,
        },
        diamond: {
            id: 6,
            material: {
                wood: 5,
                string: 4,
                diamond: 7,
            },
            durability: 200,
        },
        emerald: {
            id: 7,
            material: {
                wood: 5,
                string: 4,
                emerald: 7,
            },
            durability: 175,
        },
    },
    createfishingrod: {
        fishingrod: {
            id: true,
            material: {
                wood: 10,
                string: 15,
            },
            durability: 150,
        },
    },
}
