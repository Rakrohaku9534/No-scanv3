// Klo mau pake, pake aja ini bkn enc cma terser aja

// Klo mau pake, pake aja ini bkn enc cma terser aja

import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { mufar, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    mufar.tebakkimia = mufar.tebakkimia ? mufar.tebakkimia : {}
    let id = m.chat
    if (id in mufar.tebakkimia) {
        mufar.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', mufar.tebakkimia[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*${command.toUpperCase()}*
Usur kimia : *[ ${json.lambang} ]*

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hkim untuk bantuan
Bonus: ${poin} XP
    `.trim()
    mufar.tebakkimia[id] = [
        await mufar.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (mufar.tebakkimia[id]) mufar.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.unsur}* *[ ${json.lambang} ]*`, mufar.tebakkimia[id][0])
            delete mufar.tebakkimia[id]
        }, timeout)
    ]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

export default handler

const buttons = [
    ['Hint', '/hkim'],
    ['Nyerah', 'menyerah']
]