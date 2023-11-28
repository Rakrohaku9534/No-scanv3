// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import gtts from 'node-gtts'
import {
    readFileSync,
    unlinkSync
} from 'fs'
import {
    join
} from 'path'
import fetch from 'node-fetch'
const defaultLang = 'id'
let handler = async (m, {
    mufar,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? mufar.user.jid : m.sender
    let pp = await mufar.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
    let name = await mufar.getName(who)
    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted?.text) text = m.quoted.text

    let res
    try {
        res = await tts(text, lang)
    } catch (e) {
        m.reply(e + '')
        text = args.join(' ')
        if (!text) throw `Use example ${usedPrefix}${command} en hello world`
        res = await tts(text, defaultLang)
    } finally {
        if (res) await mufar.sendMessage(m.chat, {
            audio: res,
            seconds: fsizedoc,
            ptt: true,
            mimetype: "audio/mpeg",
            fileName: "vn.mp3",
            waveform: [100, 0, 100, 0, 100, 0, 100]
        }, {
            quoted: m
        })
    }
}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i

export default handler

function tts(text, lang = 'id') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}