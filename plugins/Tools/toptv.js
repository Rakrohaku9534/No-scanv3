// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import {
    generateWAMessageContent
} from "@whiskeysockets/baileys"

let handler = async (m, {
    mufar,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`)
    let media = await await q.download?.()
    await m.reply(wait)
    
    try {
        let msg = await generateWAMessageContent({
            video: media
        }, {
            upload: mufar.waUploadToServer
        })
        await mufar.relayMessage(m.chat, {
            ptvMessage: msg.videoMessage
        }, {
            quoted: m
        })
    } catch (e) {
        try {
            let dataVideo = {
                ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
            }
            await mufar.relayMessage(m.chat, dataVideo, {})
        } catch (e) {
            await m.reply(eror)
        }
    }
}
handler.help = ['toptv (reply)']
handler.tags = ['tools']
handler.command = /^(toptv)/i
export default handler