// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { addExif } from '../../lib/sticker.js'

let handler = async (m, { mufar, text }) => {
  if (!m.quoted) throw 'Reply a sticker!'
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Reply sticker!'
    let img = await m.quoted.download()
    if (!img) throw 'Reply a sticker!'
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) mufar.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
    else throw 'Conversion failed'
  }
}
handler.help = ['wm']
handler.tags = ['tools']
handler.alias = ['wm', 'take']
handler.command = /^(take|wm)$/i
export default handler