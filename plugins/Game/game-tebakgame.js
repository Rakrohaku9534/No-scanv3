// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.tebakgame = mufar.tebakgame ? mufar.tebakgame : {}
    let id = m.chat
    if (id in mufar.tebakgame) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakgame[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
Logo apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgame untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakgame[id] = [
        await mufar.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakgame[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tebakgame[id][0])
            delete mufar.tebakgame[id]
        }, timeout)
    ]
}
handler.help = ['tebakgame']
handler.tags = ['game']
handler.command = /^tebakgame/i

export default handler

const buttons = [
    ['Hint', '/hgame'],
    ['Nyerah', 'menyerah']
]