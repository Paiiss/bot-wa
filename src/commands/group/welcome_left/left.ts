import { ICommand } from '@constants'
import { modifyData, checkData } from '@utils/setting/group.setting'

export default {
    category: 'group',
    description: 'Setting warm left  message in your group',
    use:
        '_options_ _value_\n\n' +
        '*Options*\n~ on - turned on warm welcome message\n' +
        '~ off - turned off warm welcome message\n' +
        '~ message - set custom message\n\n' +
        'Ex:\n!welcome on\n!welcome off\n\n' +
        'For custom message:\n%member - tag new member\n%group - group name\n%desc - group description\n\n' +
        "Ex: !welcome message Hello %member, welcome to %group. Don't forget read our %desc",
    adminGroup: true,
    callback: async ({ msg, client, args }) => {
        const { from, isGroup, sender } = msg

        if (!isGroup) return await msg.reply(`Only can be executed in group.`)
        if (args.length < 0) return await msg.reply('Please check *#help welcome*')

        // Command
        let opt = args[0],
            filename = from.split('@')[0],
            dataOn
        switch (opt) {
            case 'on':
                dataOn = checkData(filename, 'on/left')
                if (dataOn === 'active') {
                    return await msg.reply('```Already active/Sudah aktif```')
                } else if (dataOn === 'no_file' || dataOn === 'inactive') {
                    modifyData(filename, 'on/left')
                    return await msg.reply('```Activated/Telah diaktifkan```')
                }
                break
            case 'off':
                dataOn = checkData(filename, 'on/left')
                if (dataOn === 'inactive') {
                    return await msg.reply('```Never active/Tidak pernah aktif```')
                } else if (dataOn === 'no_file') {
                    return await msg.reply('```Please actived this feature first/Harap aktifkan fitur ini dahulu```')
                } else if (dataOn === 'active') {
                    modifyData(filename, 'on/left')
                    return await msg.reply('```Success deactivated/Berhasil di nonaktifkan```')
                }
                break
            case 'message':
                modifyData(filename, 'left', args.slice(1).join(' '))
                await msg.reply('```Custom message edited successfully/Pesan custom berhasil di edit```')
                break
        }
    },
} as ICommand
