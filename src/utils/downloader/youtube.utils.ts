import { post } from '../helper.utils'

export const youtube = async (videoId: string, type: 'mp3' | 'mp4') => {
    const result = await post('https://yt1s.com/api/ajaxSearch/index', { q: 'https://www.youtube.com/watch?v=' + videoId, vt: type })
    if (type == 'mp3') {
        var kc = result['links']['mp3']['mp3128']['k']
        var size = result['links']['mp3']['mp3128']['size']
    } else if (type == 'mp4') {
        kc = result['links']['mp4']['18']['k']
        size = result['links']['mp4']['18']['size']
    }
    const link = await post('https://yt1s.com/api/ajaxConvert/convert', { vid: videoId, k: kc })
    return {
        title: result['title'],
        thumbnail: `https://i.ytimg.com/vi/${result['vid']}/mqdefault.jpg`,
        size,
        link: link.dlink.replace('https://', 'http://'),
    }
}

export const getYoutubeID = (url: string) => {
    return /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|shorts|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/.exec(url)[1]
}
