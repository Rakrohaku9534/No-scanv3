// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakanjime = mufar.tebakanjime ? mufar.tebakanjime : {}
    let id = m.chat
    if (id in mufar.tebakanjime) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakanjime[id][0])
        throw false
    }
    let res = await fetch('https://api.jikan.moe/v4/random/characters')
    let jsn = await res.json()
    let json = jsn.data
    let caption = `*${command.toUpperCase()}*
Siapakah nama dari gambar ini

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hani untuk hint
Bonus: ${poin} XP
    `.trim()
    mufar.tebakanjime[id] = [
        await mufar.sendFile(m.chat, json.images.jpg.image_url, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakanjime[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\n*Desk:* ${json.name_kanji}\n${json.about}`, mufar.tebakanjime[id][0])
            delete mufar.tebakanjime[id]
        }, timeout)
    ]
}
handler.help = ['tebakanime']
handler.tags = ['game']
handler.command = /^tebakanime/i

export default handler

const buttons = [
    ['Hint', '/hani'],
    ['Nyerah', 'menyerah']
]