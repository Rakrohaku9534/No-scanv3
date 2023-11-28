// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { toAudio } from '../../lib/converter.js'

let handler = async (m, { mufar, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    if (!/video|audio/.test(mime)) throw `Reply video/voice note you want to convert to audio/mp3 with command *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Can\'t download media'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Can\'t convert media to audio'
    await mufar.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['tomp3']
handler.tags = ['tools']
handler.alias = ['tomp3', 'toaudio']
handler.command = /^to(mp3|audio)$/i

export default handler