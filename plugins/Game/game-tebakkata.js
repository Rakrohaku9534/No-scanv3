// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { tebakkata } from '@bochilteam/scraper'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.tebakkata = mufar.tebakkata ? mufar.tebakkata : {}
    let id = m.chat
    if (id in mufar.tebakkata) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakkata[id][0])
        throw false
    }
    const json = await tebakkata()
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hkat untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakkata[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakkata[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tebakkata[id][0])
            delete mufar.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i

export default handler

const buttons = [
    ['Hint', '/hkat'],
    ['Nyerah', 'menyerah']
]