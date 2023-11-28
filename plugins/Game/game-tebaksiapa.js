// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.tebaksiapa = mufar.tebaksiapa ? mufar.tebaksiapa : {}
    let id = m.chat
    if (id in mufar.tebaksiapa) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebaksiapa[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsia untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebaksiapa[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebaksiapa[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, mufar.tebaksiapa[id][0])
            delete mufar.tebaksiapa[id]
        }, timeout)
    ]
}
handler.help = ['tebaksiapa']
handler.tags = ['game']
handler.command = /^tebaksiapa/i

export default handler

const buttons = [
    ['Hint', '/hsia'],
    ['Nyerah', 'menyerah']
]