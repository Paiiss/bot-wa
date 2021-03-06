const fs = require('fs')
const { join } = require('path')
let rootDir = join(__dirname, 'group')

export function modifyData(filename, type, insertData = null) {
    // Checking for file if present
    const present = fs.readdirSync(rootDir).includes(filename + '.json')
    if (present) {
        // Start processing data
        let data = JSON.parse(fs.readFileSync(join(rootDir, filename + '.json')))
        switch (type) {
            case 'join':
                data['join']['msg'] = insertData
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'left':
                data['left']['msg'] = insertData
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'on/join':
                if (data['join']['active']) {
                    data['join']['active'] = false
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                } else {
                    data['join']['active'] = true
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                }
                break
            case 'on/left':
                if (data['left']['active']) {
                    data['left']['active'] = false
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                } else {
                    data['left']['active'] = true
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                }
                break
            case 'on/link':
                if (data['link']['active']) {
                    data['link']['active'] = false
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                } else {
                    data['link']['active'] = true
                    fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                }
                break
        }
    } else {
        let data = {
            join: { msg: 'Hello, %user\nWelcome to *%group*\nHave fun with us!', active: false },
            left: { msg: 'Goodbye %user', active: false },
            link: { active: false },
        }
        switch (type) {
            case 'on/join':
                data['join']['active'] = true
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'on/left':
                data['left']['active'] = true
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'on/link':
                data['link']['active'] = true
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'join':
                data['join']['msg'] = insertData
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
            case 'left':
                data['left']['msg'] = insertData
                fs.writeFileSync(join(rootDir, filename + '.json'), JSON.stringify(data, null, 2))
                break
        }
    }
}

export function checkData(filename, type = null) {
    // Checking if file present
    const present = fs.readdirSync(rootDir).includes(filename + '.json')
    // Processing Data
    let status
    if (present) {
        let data = JSON.parse(fs.readFileSync(join(rootDir, filename + '.json')))
        switch (type) {
            case 'on/join':
                if (data['join']['active']) {
                    status = 'active'
                } else if (!data['join']['active']) {
                    status = 'inactive'
                }
                break
            case 'on/left':
                if (data['left']['active']) {
                    status = 'active'
                } else if (!data['left']['active']) {
                    status = 'inactive'
                }
                break
            case 'on/link':
                if (data['link']['active']) {
                    status = 'active'
                } else if (!data['link']['active']) {
                    status = 'inactive'
                }
                break
        }
    } else {
        status = 'no_file'
    }
    return status
}

export function getData(filename) {
    // Checking if file present
    const present = fs.readdirSync(rootDir).includes(filename + '.json')
    let data
    if (present) {
        // Start proccesing data
        data = JSON.parse(fs.readFileSync(join(rootDir, filename + '.json')))
    } else {
        data = 'no_file'
    }
    return data
}

export function deleteData(filename) {
    // Checking if file present
    const present = fs.readdirSync(rootDir).includes(filename + '.json')
    if (present) {
        // Start Deleting
        fs.unlinkSync(join(rootDir, filename + '.json'))
    }
}
