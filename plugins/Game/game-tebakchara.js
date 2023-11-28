// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakchara = mufar.tebakchara ? mufar.tebakchara : {}
    let id = m.chat
    if (id in mufar.tebakchara) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakchara[id][0])
        throw false
    }
    let res = await fetch('https://api.jikan.moe/v4/characters')
    let jsons = await res.json()
    let jso = jsons.data
    let json = jso.getRandom()
    let caption = `*${command.toUpperCase()}*
Siapakah nama dari gambar ini

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcha untuk hint
Bonus: ${poin} XP
    `.trim()
    mufar.tebakchara[id] = [
        await mufar.sendFile(m.chat, json.images.jpg.image_url, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakchara[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\nKanji : ${json.name_kanji}\n*Url :* ${json.url}\n*Desk :* ${json.about}`, mufar.tebakchara[id][0])
            delete mufar.tebakchara[id]
        }, timeout)
    ]
}
handler.help = ['tebakchara']
handler.tags = ['game']
handler.command = /^tebakchara/i

export default handler

const buttons = [
    ['Hint', '/hcha'],
    ['Nyerah', 'menyerah']
]