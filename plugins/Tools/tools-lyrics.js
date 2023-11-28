// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { lyrics, lyricsv2 } from '@bochilteam/scraper'

let handler = async (m, { mufar, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) throw `Use example ${usedPrefix}${command} hallo`
    const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
    m.reply(`
Lyrics *${result.title}*
Author ${result.author}


${result.lyrics}


Url ${result.link}
`.trim())
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['tools']
handler.command = /^(lirik|lyrics|lyric)$/i

export default handler