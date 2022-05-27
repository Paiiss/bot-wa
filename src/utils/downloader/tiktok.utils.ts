import axios from 'axios'
import cheerio from 'cheerio'

async function getTokenAndSess() {
    let url = 'https://musicaldown.com/en/'
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    let metadata = {}
    $('form[class="col s12"]')
        .find('input')
        .each((a, b) => {
            metadata[$(b).attr('name')] = $(b).val() || ''
        })
    return { metadata, cookie: res.headers['set-cookie'][0] }
}

async function post(formdata: {}, sess: string, type?: 'mp3' | 'mp4') {
    let metadata = { mp4: [], mp3: [] }
    if (type == 'mp4') {
        let resMp4 = await axios({
            url: 'https://musicaldown.com/download',
            method: 'POST',
            data: new URLSearchParams(Object.entries(formdata)),
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'id,en-US;q=0.9,en;q=0.8',
                'content-type': 'application/x-www-form-urlencoded',
                cookie: sess,
            },
        })
        const cheerMp4 = cheerio.load(resMp4.data)
        cheerMp4('div.row')
            .find('a')
            .each((a, b) => {
                let rex = /(?:https:?\/{2})?(?:w{3}|v[0-9])?\.?(?:mscdn\.|tiktokcdn\.)?(?:com|xyz)([^\s&]+)/gi
                let c = cheerMp4(b).attr('href')
                if (rex.test(c)) {
                    metadata['mp4'].push(c)
                }
            })
    } else {
        let resMp3 = await axios({
            url: 'https://musicaldown.com/id/mp3',
            method: 'POST',
            data: new URLSearchParams(Object.entries(formdata)),
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'id,en-US;q=0.9,en;q=0.8',
                'content-type': 'application/x-www-form-urlencoded',
                cookie: sess,
            },
        })
        const cheerMp3 = cheerio.load(resMp3.data)
        cheerMp3('div.row')
            .find('a')
            .each((a, b) => {
                let rex = /(?:https:?\/{2})?(?:w{3}|v[0-9]|[a-zA-Z0-9])\.?(?:muscdn|tiktokcdn|musicaldown)\.?(?:com|xyz)([^\s&]+)/gi
                let c = cheerMp3(b).attr('href')
                if (rex.test(c)) {
                    metadata['mp3'].push(c)
                }
            })
    }
    return metadata
}

export const tiktok = async (url: string, type: 'mp3' | 'mp4') => {
    try {
        let meta = await getTokenAndSess()
        let keys = Object.keys(meta.metadata)
        let a = {}
        for (let mt of keys) {
            a[mt] = meta.metadata[mt]
            if (meta.metadata[mt] === '') {
                a[mt] = url
            }
        }
        let res = await post(a, meta.cookie, type)
        return res
    } catch (e) {
        throw new Error("Can't get metadata from given URL")
    }
}
