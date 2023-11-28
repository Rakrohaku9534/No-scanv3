// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { extractMetadata } from 'wa-sticker-formatter'
import { format } from 'util'

let handler = async (m, { mufar }) => {
    if (m.quoted && /sticker/.test(m.quoted.mtype)) {
        let img = await m.quoted.download()
        if (!img) throw 'Can\'t extract metadata sticker!'
        let metaData = await extractMetadata(img)
        await m.reply(format(metaData))
    } else throw 'Reply a sticker!'
}
handler.help = handler.alias = ['getexif']
handler.tags = ['tools']
handler.command = /^(getexif)$/i
export default handler