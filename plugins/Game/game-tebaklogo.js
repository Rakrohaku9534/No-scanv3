// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebaklogo = mufar.tebaklogo ? mufar.tebaklogo : {}
    let id = m.chat
    if (id in mufar.tebaklogo) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebaklogo[id][0])
        throw false
    }
    let res = await fetch(`https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json`)
    let src = await res.json()
    let Apps = src[Math.floor(Math.random() * src.length)]
    let json = { hasil: Apps }
    let caption = `*${command.toUpperCase()}*
Logo apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlog untuk hint
Bonus: ${poin} XP
    `.trim()
    mufar.tebaklogo[id] = [
        await mufar.sendFile(m.chat, json.hasil.data.image, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebaklogo[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.hasil.data.jawaban}*`, mufar.tebaklogo[id][0])
            delete mufar.tebaklogo[id]
        }, timeout)
    ]
}
handler.help = ['tebaklogo']
handler.tags = ['game']
handler.command = /^tebaklogo/i

export default handler

const buttons = [
    ['Hint', '/hlog'],
    ['Nyerah', 'menyerah']
]