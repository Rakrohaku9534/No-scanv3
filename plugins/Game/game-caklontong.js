// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import { caklontong } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.caklontong = mufar.caklontong ? mufar.caklontong : {}
    let id = m.chat
    if (id in mufar.caklontong) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.caklontong[id][0])
        throw false
    }
    const json = await caklontong()
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcak untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.caklontong[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.caklontong[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.caklontong[id][0])
            delete mufar.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i

export default handler

const buttons = [
    ['Hint', '/hcak'],
    ['Nyerah', 'menyerah']
]