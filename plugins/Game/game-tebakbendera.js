// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
    mufar.tebakbendera = mufar.tebakbendera ? mufar.tebakbendera : {}
    let id = m.chat
    if (id in mufar.tebakbendera) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*${command.toUpperCase()}*
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hben untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakbendera[id] = [
        await mufar.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakbendera[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, mufar.tebakbendera[id][0])
            delete mufar.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i

export default handler

const buttons = [
    ['Hint', '/hben'],
    ['Nyerah', 'menyerah']
]